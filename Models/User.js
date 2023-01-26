const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        name : String,
        email : {type : String,unique : true , required : true},
        age : Number,
        password : {type : String, required : true},
        imageU : String,
        role : String
    }
)

module.exports = mongoose.model('imprimerie',UserSchema)