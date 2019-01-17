
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const schema = mongoose.Schema;
const {SECRET, USER_ROLE} = require('../../config/config');

const HostSchema = new schema({
    HostName: String,
    Description: String,
    Website: String,
    Email: String,
    Phone: String,
    UserID: String
});

HostSchema.statics.addHost = async (args) => {

    var info = {};

    if(args.hostname) info.HostName = args.hostname;
    if(args.description) info.Description = args.description;
    if(args.website) info.Website = args.website;
    if(args.email) info.Email = args.email;
    if(args.phone) info.Phone = args.phone;
    if(args.userid) info.UserID = args.userid;

    try{

        const host = await new Host(info);

        if(!host){
            console.log('Add host fail!');
            return null;
        }

        console.log('Added new host!');

        return host.save();

    }catch(err){
        throw err;
    }

}

HostSchema.statics.updateHost = async (args, user) => {

    var info = {};

    if(args.hostname) info.HostName = args.hostname;
    if(args.description) info.Description = args.description;
    if(args.website) info.Website = args.website;
    if(args.email) info.Email = args.email;
    if(args.phone) info.Phone = args.phone;

    return Host.findByIdAndUpdate({_id: args.id}, info, {'new': true}, (err, obj) => {
        if(err) return null;
        console.log('Updated successfully!');
        return obj;
    });
}

const Host = mongoose.model('Host', HostSchema);
module.exports = Host;