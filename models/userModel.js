const mongoose = require('mongoose');
const schema = mongoose.Schema;

//dW728ngdhs4

const UserSchema = new schema({
	Username: {
		type: String
	},
	GoogleID: {
		type: String
	},
	FacebookID: {
		type: String
	},
	Password: {
		type: String
	},
	Birthdate: {
		type: Date
	},
	Phone: {
		type: String
	},
	Email: {
		type: String
	},
	Company: {
		type: String
	},
	AvatarLink: {
		type: String
	},
	SocialLink: {
		type: String
	},
	Role: {
		type: String
	},
	Bookmarks: {
			type: [schema.Types.ObjectId],
			ref: 'Event'
	},
	CreatedEvents: {
			type: [schema.Types.ObjectId],
			ref: 'Event'
	}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;