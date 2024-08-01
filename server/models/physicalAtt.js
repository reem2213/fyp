const mongoose = require('mongoose')
 
const physicalAttSchema = new mongoose.Schema({
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    goal: String,
    medicalCondition: String,
    place: String,





})
 
const physicalAttributeModel = mongoose.model("physicalAttribute", physicalAttSchema)
 
module.exports = physicalAttributeModel;