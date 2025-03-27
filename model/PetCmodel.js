import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parkingLotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
   type:Number, required: true 
  },
  description: {
    type: String,
    required: true
  },
  image: { 
    url:{
    type: String, // Store the URL or file path of the image
    required: true
    }
  }
}, {
  timestamps: true
});

const ParkingModel = mongoose.model('PetBackend', parkingLotSchema);
export default ParkingModel;