const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const schema = mongoose.Schema;
const {SECRET, USER_ROLE} = require('../config/config');

const HostSchema = new schema({
    HostName: String,
    Description: String,
    Website: String,
    Email: String,
    Phone: String,
    InEvents: [
			{
				type: schema.Types.ObjectId,
				ref: 'Event'
			}
    ]
});

const Host = mongoose.model('Host', HostSchema);
module.exports = Host;