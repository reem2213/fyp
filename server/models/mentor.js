const mongoose = require('mongoose')
 
const mentorSchema = new mongoose.Schema({
    name: String,
    type: String,
    description:String,
    rating:Number

})
 
const mentorModel = mongoose.model("mentor", mentorSchema)
 
module.exports = mentorModel;