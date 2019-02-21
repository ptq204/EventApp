//dW728ngdhs4
const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const typeDefs = require('./schema/index');
const resolvers = require('./resolvers/index');
const {DBLINK, PORT} = require('./config/config');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const admin = require('firebase-admin');
const firebase = require('firebase');

// normal authentication
const getUser = require('./middleware/normalAuth');
// facebook authentication
const fbPassport = require('./middleware/facebookAuth');
const ggPassport = require('./middleware/googleAuth');


var serviceAccount = require('./serverapi-57ed2-firebase-adminsdk-c5t2c-503bda8932.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://serverapi-57ed2.firebaseio.com"
});

var config = {
  apiKey: "AIzaSyCUdB-PtVIq9FdWUbYFiyPv2v4Zgldy4Lg",
  databaseURL: "https://serverapi-57ed2.firebaseio.com",
  projectId: "serverapi-57ed2",
  storageBucket: "gs://serverapi-57ed2.appspot.com",
};
firebase.initializeApp(config);
//var firebaseStorage = firebase.storage().ref();

mongoose.connect(DBLINK);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
})

const app = express();

app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*"); //My frontend APP domain
  res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin, enctype');
  next();
});

var cnt = 0;
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `./uploads/posters`);
	},
	filename: (req, file, cb) => {
    //var desPath = `${req.body.UserID + `_${cnt++}` + '.' + file.mimetype.split('/')[1]}`;
    var desPath = file.originalname;
		cb(null, desPath);
	}
});

const upload = multer({
	storage: storage,
}).any();

app.post('/upload', upload, (req, res) => {
	console.log('files', req.files);
	var numFiles = req.files.length;
	cnt = 0;
	for(let i = 0; i < numFiles; i++){
		var filePath = req.files[i].path;
		sharp(filePath).resize(600,400).toBuffer((err, buff) => {
			fs.writeFile(filePath, buff, (e) => {
				/*firebaseStorage.child(filePath.replace('\\', '/')).put(filePath).then(snapshot => {
          console.log(`Uploaded ${req.files[i].originalname}`);
        })*/
			})
		})
	}
	res.send(req.files);
});

app.get('/', (req, res) => {
  res.send('Event app server');
});

app.get('/fblogin',
  fbPassport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  fbPassport.authenticate('facebook', { session: false }),
  function(req, res) {
  	// Successful authentication, redirect home.
  	res.redirect('/');
	});

app.get('/ggLogin',
  ggPassport.authenticate('google', { scope: ['profile','email']}),
  function(req, res){
    res.redirect('/');
  });

app.get('/auth/google/callback', 
  ggPassport.authenticate('google', { session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
	});

const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({
	introspection: true,
	schema: schema,
	context: ({req}) => {
		const token = req.headers.authorization;
		const auth_token = token ? token.split(' ')[1] : '';
		return getUser(auth_token);
	}
});

server.applyMiddleware({app, path: '/graphql'});

app.listen(PORT, () => {
    console.log(`Apollo server listens on http://localhost:${PORT}/graphql`);
});