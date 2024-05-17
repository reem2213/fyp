const mongoose=require('mongoose');

const postSchema= new mongoose.Schema({
    caption:String,
    nb_of_likes:Number,
    nb_of_repost:Number,
    date_published:Date


})


const postModel=mongoose.model('post',postSchema);
module.exports=postModel;