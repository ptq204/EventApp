const eventResolver = require('./event');
const hostResolver = require('./host');
const userResolver = require('./user');
const categoryResolver = require('./category');

const rootResolver = [eventResolver, hostResolver, userResolver, categoryResolver]

module.exports = rootResolver;