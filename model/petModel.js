// models/PetModel.js
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  imageUrl: Array,
  description: String,
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
