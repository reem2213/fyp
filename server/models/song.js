const mongoose = require('mongoose')
 
const songSchema = new mongoose.Schema({
    name:String,
    
})
 
const songModel = mongoose.model("song", songSchema)
 
module.exports = songModel;