const mongoose=require('mongoose');

const profileSchema= new mongoose.Schema({
    username:String,
    bio:String,
    
})


const profileModel=mongoose.model('userprofile',profileSchema);
module.exports=profileModel;