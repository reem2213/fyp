const mongoose = require('mongoose')
 
const feedbackSchema = new mongoose.Schema({
    type:String,
    content:String,
    rating: Number



})
 
const feedbackModel = mongoose.model("feedback", feedbackSchema)
 
module.exports = feedbackModel;