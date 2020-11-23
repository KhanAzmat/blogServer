const mongoose = require('mongoose');
//const schema = mongoose.Schema;

const user = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
});
 
//module.exports =
 mongoose.model('User',user);