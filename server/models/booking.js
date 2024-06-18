const mongoose = require('mongoose')
 
const bookingSchema = new mongoose.Schema({
    mentorName:String,
    time:String,
    duration: String,
    meetingType:String,
    location:String,
    date:Date,
    status:String
})
 
const bookingModel = mongoose.model("booking", bookingSchema)
 
module.exports = bookingModel;
