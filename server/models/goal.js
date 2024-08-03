const mongoose = require('mongoose')
 
const goalSchema = new mongoose.Schema({
    goal:String,
    date:Date,
    status:String,
    username: { type: String, required: true }, // Add this line




})
 
const goalModel = mongoose.model("goal", goalSchema)
 
module.exports = goalModel;