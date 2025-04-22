require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/cars');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contact');

console.log('Environment Variables:', {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT
});

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/autohaven', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000'], // Allow frontend (React/Vue)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    credentials: true // If using cookies/auth
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('AutoHaven API is running');
});

// Error handlers
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});