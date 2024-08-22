const mongoose = require('mongoose')
 
const goalSchema = new mongoose.Schema({
    goal:String,
    date:Date,
    status:String,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Replace username with userId





})
 
const goalModel = mongoose.model("goal", goalSchema)
 
module.exports = goalModel;