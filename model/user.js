const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"name required"]
    },
    email:{
        type:String,
        required:[true,"email required"]
    }
});

const User = mongoose.model('users',UserSchema)
module.exports = User;