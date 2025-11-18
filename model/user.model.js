const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'User must have a name !'],
    },
    email:{
        type:String,
        required:[true,"User must have a email address"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"User must have a password"],
        minLength:[8,"Minimum Password length is 8"]
    }
});


const User=mongoose.Schema('User',userSchema);

module.exports=User;