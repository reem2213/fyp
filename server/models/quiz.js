const mongoose = require('mongoose')
 
const quizSchema = new mongoose.Schema({
    question:String,
    option1:String,
    option2:String,
    option3:String,
    correct_option:String,



})
 
const quizModel = mongoose.model("quiz", quizSchema)
 
module.exports = quizModel;