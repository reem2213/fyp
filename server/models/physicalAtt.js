const mongoose = require('mongoose')
 
const physicalAttSchema = new mongoose.Schema({
    gender:String,
    age: Number,
    height: Number,
    weight: Number,
    fitness_level:String,
    medical_cond:String,
    exercise_env:String,
    goal:String





})
 
const physicalAttributeModel = mongoose.model("physicalAttribute", physicalAttSchema)
 
module.exports = physicalAttributeModel;