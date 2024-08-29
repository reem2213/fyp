const mongoose = require('mongoose')
 
const bookSchema = new mongoose.Schema({
    title:String,
    author:String,
    description: String,
    rating:Number,
    image:String,
    saved:Boolean
})
 
const bookModel = mongoose.model("book", bookSchema)
 
module.exports = bookModel;
