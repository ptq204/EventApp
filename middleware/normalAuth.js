const jwt = require('jsonwebtoken');
const {SECRET, ADMIN_ROLE, USER_ROLE } = require('../config/config');

const getUser = async (token) => {

	console.log('Token: ' + token);

	var options = {
		expiresIn: '30d',
		algorithm: ['HS256']
	}

	try{
		const verify = await jwt.verify(token, SECRET, options);
		if(!verify){
			console.log('Authenticated fail!');
			return {user: null};
		}
		else{
			const user = JSON.stringify(verify);
			console.log('User: ' + user);
			return {user: JSON.parse(user)};
		}

	}catch(err){
		console.log(err);
		return null;
	}
}

module.exports = getUser;