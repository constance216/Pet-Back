import express from 'express';
import { createParkingLot,ListAllParking} from '../controller/petMcontroller.js';
import upload from "../middleware/multer.js"
const router = express.Router();
// Parking Routes
router.post('/create',upload.single("image"), createParkingLot);  // Register a new parking lot
router.get('/list',ListAllParking); //List all parking lots
export default router;