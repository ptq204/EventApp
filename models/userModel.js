const mongoose = require('mongoose');
const schema = mongoose.Schema;

//dW728ngdhs4

const UserSchema = new schema({
	Username: String,
	GoogleID: String,
	FacebookID: String,
	Password: String,
	Birthdate: Date,
	Phone: String,
	Email: String,
	Company: String,
	AvatarLink: String,
	SocialLink: String,
	Role: String,
	Bookmarks: [String],
	CreatedEvents: [
		{
			type: schema.Types.ObjectId,
			ref: 'Event'
		}
	]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;