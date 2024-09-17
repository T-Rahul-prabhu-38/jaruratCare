const express = require('express');
const { Service } = require('../models/models.js'); // Ensure correct path to models.js

const router = express.Router();

// Pre-stored JSON data
const preStoredServices = [
  { name: 'Service 1', description: 'Description for service 1', price: 100 },
  { name: 'Service 2', description: 'Description for service 2', price: 200 },
  { name: 'Service 3', description: 'Description for service 3', price: 300 }
];

// Endpoint to load pre-stored data into the database
router.post('/load-prestored', async (req, res) => {
  try {
    const savedServices = await Service.insertMany(preStoredServices);
    res.status(201).json(savedServices);
  } catch (error) {
    console.error('Error loading pre-stored services:', error);
    res.status(500).json({ error: 'Error loading pre-stored services', details: error.message });
  }
});

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Error fetching services', details: error.message });
  }
});

// Adding new data to db
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required fields' });
    }

    const newService = new Service({ name, description, price });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ error: 'Error adding service', details: error.message });
  }
});

// Using PUT in postman to update
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Error updating service', details: error.message });
  }
});

// DELETE /api/services/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Error deleting service', details: error.message });
  }
});

module.exports = router;