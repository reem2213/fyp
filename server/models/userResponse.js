const mongoose=require('mongoose');

const responseSchema= new mongoose.Schema({
    score: Number,
  points: Number,
  date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },


})


const responseModel=mongoose.model('userResponse',responseSchema);
module.exports=responseModel;



