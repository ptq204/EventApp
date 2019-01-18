//dW728ngdhs4
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const mongoose = require('mongoose');
const schema = require('./schema/graphql/app');
const {DBLINK, PORT} = require('./config/config');

mongoose.connect(DBLINK);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})

const app = express();

app.use('/', (req, res) => {
    res.send('Event app server');
});

const server = new ApolloServer({
    introspection: true,
    schema: schema
});

server.applyMiddleware({app, path: '/graphql'});

app.listen(PORT, () => {
    console.log(`Apollo server listens on http://localhost:${PORT}/graphql`);
});