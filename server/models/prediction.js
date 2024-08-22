const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Replace username with userId
  prediction: { type: String, required: true },  // Assuming prediction is a string; adjust as needed
});

const predictionModel = mongoose.model('prediction', PredictionSchema);

module.exports = predictionModel;



