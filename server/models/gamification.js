const mongoose=require('mongoose');

const gamificationSchema= new mongoose.Schema({
    name:String,
    level:String,
    points:Number,
    message:String


})


const gamificationModel=mongoose.model('gamification',gamificationSchema);
module.exports=gamificationModel;