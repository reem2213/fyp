const mongoose = require('mongoose')
 
const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    description: String,
    rating:Number



})
 
const bookModel = mongoose.model("book", bookSchema)
 
module.exports = bookModel;