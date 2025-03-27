import mongoose from "mongoose";
const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  adopterName: String,
  adopterContact: String,
  reason: String,
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet', // Reference to the Pet model
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

const AdoptionRequest = mongoose.model('AdoptionRequest', adoptionRequestSchema);
module.exports = AdoptionRequest;
