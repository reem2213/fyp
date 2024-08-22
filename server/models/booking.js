const mongoose = require('mongoose')
 
const bookingSchema = new mongoose.Schema({
    mentorName:String,
    time:String,
    duration: String,
    meetingType:String,
    location:String,
    date:Date,
    status:String,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Replace username with userId
})
 
const bookingModel = mongoose.model("booking", bookingSchema)
 
module.exports = bookingModel;
