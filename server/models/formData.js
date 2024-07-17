const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    goal: String,
    medicalCondition: String,
    place: String,
});

module.exports = mongoose.model('formData', FormDataSchema);
