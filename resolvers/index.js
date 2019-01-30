const eventResolver = require('./event');
const hostResolver = require('./host');
const userResolver = require('./user');

const rootResolver = [eventResolver, hostResolver, userResolver]

module.exports = rootResolver;