//Access mongoose package
const mongoose = require("mongoose");

//Connect
mongoose.connect('mongodb://localhost:27017/Lib');

//Schema definition
const Schema = mongoose.Schema;
 

const UserSchema = new Schema({
            user_fname      : { type: String , required : true},
            user_lname      : { type: String , required : true},
            user_email      : { type: String , required : true},
            user_password   : { type: String , required : true},
            user_createdon  : { type : Date, default: Date.now }   //Signup date
});

//Create model Userdata
var Userdata = mongoose.model('lib_user',UserSchema);

//exports
module.exports = Userdata ;