import ParkingModel from "../model/PetCmodel.js";
import { BadRequestError } from "../error/BadRequestError.js";
import cloudinary from "../utils/cloudinary.js";
import path from "path";
import fs from "fs";  // Import fs to remove local files after upload

export const createParkingLot = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Convert image path to absolute path
    const filePath = path.resolve(req.file.path);

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "parking_images",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Delete the file from local storage after upload
    fs.unlinkSync(filePath);

    if (!result || !result.secure_url) {
      return res.status(400).json({ error: "Failed to upload image" });
    }

    // Ensure nearbyBuildings is an array
    const nearbyBuildings = req.body.nearbyBuildings
      ? JSON.parse(req.body.nearbyBuildings)
      : [];

    const newParkingLot = new ParkingModel({
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      description: req.body.description,
      image: {
        url: result.secure_url,
      },
    });

    const savedParkingLot = await newParkingLot.save();

    res.status(201).json({
      message: "Pet created successfully",
      data: savedParkingLot,
    });
  } catch (error) {
    console.error("Error while creating pet:", error);
    res.status(500).json({
      message: "Failed to create pet",
      error: error.message,
    });
  }
};

// List all parking lots
export const ListAllParking = async (req, res, next) => {
  try {
    const allParking = await ParkingModel.find();
    res.status(200).json({
      data: allParking,
      message: "All parking lots found",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};