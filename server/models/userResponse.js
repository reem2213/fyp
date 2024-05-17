const mongoose=require('mongoose');

const responseSchema= new mongoose.Schema({
    grade:Number,
    status:String

})


const responseModel=mongoose.model('userResponse',responseSchema);
module.exports=responseModel;