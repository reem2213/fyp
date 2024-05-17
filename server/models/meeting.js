const mongoose = require('mongoose')
 
const communitySchema = new mongoose.Schema({
    date: Date,
    time:Number,
    duration: Number,
    location:String,
    status:String


})
 
const communityModel = mongoose.model("community", communitySchema)
 
module.exports = communityModel;