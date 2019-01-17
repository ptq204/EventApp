const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const schema = mongoose.Schema;
const {SECRET, USER_ROLE} = require('../../config/config');
//dW728ngdhs4

const UserSchema = new schema({
    Username: String,
    Password: String,
    Birthdate: Date,
    Phone: String,
    Email: String,
    Company: String,
    AvatarLink: String,
    SocialLink: String,
    Role: String,
    Events: [String],
    Bookmarks: [String]
});

UserSchema.statics.createUser = async (username, password, email, phone, social) => {

    try{
        const user_tmp = await User.findOne({Email: email});

        if(user_tmp){
            console.log('THis email was used!');
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

        var salt = (Math.random() * 20) + 1;

        user.Password = bcryptjs.hashSync(user.Password, salt);

        console.log('Created new user!');

        return user.save();

    }catch(err){
        throw err;
    }
}

UserSchema.statics.auth = async (args) => {
    
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
            _id: userer._id,
            email: user.Email,
            role: user.Role
        }, SECRET, {algorithm: 'HS256', expiresIn: '30d'});

        console.log('Authenticated successfully!');
        return token;

    }catch(err){
        throw err;
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;