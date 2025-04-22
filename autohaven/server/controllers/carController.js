// controllers/carController.js
const asyncHandler = require('express-async-handler');
const Car = require('../models/Car'); // Assuming you have a Mongoose model

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
  try {
    // Optional query parameters
    const { make, minPrice, maxPrice } = req.query;
    
    const filter = {};
    if (make) filter.make = { $regex: make, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const cars = await Car.find(filter).sort('-createdAt');
    res.json({
      success: true,
      count: cars.length,
      data: cars
    });
    
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
const getCar = asyncHandler(async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    res.json({
      success: true,
      data: car
    });

  } catch (err) {
    console.error(`Error fetching car ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Create new car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
  try {
    const { make, model, year, price } = req.body;

    // Basic validation
    if (!make || !model || !year || !price) {
      return res.status(400).json({
        success: false,
        error: 'Please include all required fields'
      });
    }

    const car = await Car.create({
      make,
      model,
      year,
      price,
      user: req.user.id // From auth middleware
    });

    res.status(201).json({
      success: true,
      data: car
    });

  } catch (err) {
    console.error('Error creating car:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    // Update only provided fields
    const updates = {};
    if (req.body.make) updates.make = req.body.make;
    if (req.body.model) updates.model = req.body.model;
    if (req.body.year) updates.year = req.body.year;
    if (req.body.price) updates.price = req.body.price;

    car = await Car.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: car
    });

  } catch (err) {
    console.error(`Error updating car ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: 'Car not found'
      });
    }

    await car.remove();

    res.json({
      success: true,
      data: {}
    });

  } catch (err) {
    console.error(`Error deleting car ${req.params.id}:`, err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
};