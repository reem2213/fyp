const mongoose = require('mongoose')
 
const communitySchema = new mongoose.Schema({
    name: String,
    description:String,
    status: String,
    nbOfParticipant:Number


})
 
const communityModel = mongoose.model("community", communitySchema)
 
module.exports = communityModel;