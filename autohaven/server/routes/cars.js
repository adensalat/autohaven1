const express = require('express');
const router = express.Router();
const { 
  getCars, 
  getCar, 
  createCar, 
  updateCar, 
  deleteCar 
} = require('../controllers/carController');
const { protect, admin } = require('../middleware/authMiddleware');

// GET all cars (public)
router.get('/', getCars);

// GET single car (public)
router.get('/:id', getCar);

// CREATE car (protected - admin only)
router.post('/', protect, admin, createCar);

// UPDATE car (protected - admin only)
router.put('/:id', protect, admin, updateCar);

// DELETE car (protected - admin only)
router.delete('/:id', protect, admin, deleteCar);

module.exports = router;