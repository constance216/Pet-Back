import Pet from '../model/petModel.js'; 

export const createPet = async (req, res) => {
  const { name, breed, age, imageUrl, description } = req.body;

  // Validate the age field
  if (isNaN(age) || age <= 0) {
    return res.status(400).json({ message: "Invalid age value." });
  }

  try {
    const newPet = new Pet({
      name,
      breed,
      age: Number(age), 
      imageUrl,
      description,
    });

    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding pet' });
  }
};
