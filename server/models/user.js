const mongoose=require('mongoose');

const newSchema= new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    gender:String,
    dateOfBirth:Date,
    phoneNo:String,
    bio:String,
    image:String

})
const userModel=mongoose.model('user',newSchema);
module.exports=userModel;