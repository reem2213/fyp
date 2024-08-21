const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  prediction: { type: String, required: true },  // Assuming prediction is a string; adjust as needed
});

const predictionModel = mongoose.model('prediction', PredictionSchema);

module.exports = predictionModel;



