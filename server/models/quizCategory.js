const mongoose = require('mongoose')
 
const quizCategorySchema = new mongoose.Schema({
    name:String,
    



})
 
const quizCategoryModel = mongoose.model("quizCategory", quizCategorySchema)
 
module.exports = quizCategoryModel;