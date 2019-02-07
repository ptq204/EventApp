//dW728ngdhs4
const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const mongoose = require('mongoose');
const typeDefs = require('./schema/index');
const resolvers = require('./resolvers/index');
const {DBLINK, PORT} = require('./config/config');

// normal authentication
const getUser = require('./middleware/normalAuth');
// facebook authentication
const fbPassport = require('./middleware/facebookAuth');
const ggPassport = require('./middleware/googleAuth');

mongoose.connect(DBLINK);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
})

const app = express();

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