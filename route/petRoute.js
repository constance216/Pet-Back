// routes/PetRoutes.js
import express from 'express';
import { createPet } from '../controller/petController.js';

const petRouter = express.Router();

// Define the POST /api/pets route
petRouter.post('/', createPet);

export default petRouter;
