const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {SECRET, USER_ROLE} = require('../config/config');

UserSchema = {
  createUser: async (username, password, email, phone, social) => {

    try{
			const user_tmp = await User.findOne({Email: email});

			if(user_tmp){
				console.log('This email was used!');
				return null;
			}

			const user = await new User({
				Username: username,
				Password: password,
				Email: email,
				Phone: phone,
				SocialLink: social,
				Role: USER_ROLE
			});

			var salt = Math.round((Math.random() * 20) + 4);

			user.Password = await bcryptjs.hashSync(user.Password, salt);

			console.log('Created new user!');

			return user.save();
  
    }catch(err){
      throw err;
    }
  },

  auth: async (args) => {
  
    try{
  
			var info = {};
			if(args.email) info.Email = args.email;
			else if(args.username) info.Username = args.username;
			
			const user = await User.findOne(info);

			if(!user){
				console.log('Cannot find this user!');
				return null;
			}

			const verify = await bcryptjs.compareSync(args.password, user.Password);

			if(!verify){
				console.log('Password is not match!');
				return null;
			}

			const token = await jwt.sign({
				_id: user._id,
				email: user.Email,
				role: user.Role
			}, SECRET, {algorithm: 'HS256', expiresIn: '30d'});

			console.log('Authenticated successfully!');
			return token;
  
    }catch(err){
      throw err;
    }
  }
}

module.exports = UserSchema;