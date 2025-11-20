const mongoose = require("mongoose");
const validator=require('validator');
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'User must have a name !'],
    },
    email:{
        type:String,
        required:[true,"User must have a email address"],
        unique:true,
        //NOTE: validate will work only when CREATE or SAVE (NOT WHILE UPDATING)!!!
        //try this code
        // validate:{
        //     validator:function(el){
        //         return validator.isEmail(el);
        //     },
        //     message:"Provided email is not valid!"
        // }
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Provided email is not valid!");
            }
        } 
    },
    password:{
        type:String,
        required:[true,"User must have a password"],
        minLength:[8,"Minimum Password length is 8"],
        validate:{
            validator:function(value){
              return validator.isStrongPassword(value);
            },
            message:'Password must have atleast one lowercase character and one uppercase character '
        }
    }
});


const User=mongoose.Schema('User',userSchema);

module.exports=User;