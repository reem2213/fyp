const mongoose = require('mongoose')
 
const goalSchema = new mongoose.Schema({
    goal:String,
    date:Date,
    status:String



})
 
const goalModel = mongoose.model("goal", goalSchema)
 
module.exports = goalModel;