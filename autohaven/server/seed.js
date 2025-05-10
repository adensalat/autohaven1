require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');

// Sample car data
const carData = [
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 25000,
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG95b3RhJTIwY2Ftcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Well-maintained Toyota Camry with low mileage. Features include power windows, cruise control, and backup camera.',
    features: ['Backup Camera', 'Bluetooth', 'Cruise Control', 'Power Windows'],
    isAvailable: true
  },
  {
    make: 'Honda',
    model: 'Accord',
    year: 2021,
    price: 23500,
    mileage: 20000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9uZGElMjBhY2NvcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Reliable Honda Accord with excellent fuel efficiency. Includes leather seats, sunroof, and advanced safety features.',
    features: ['Leather Seats', 'Sunroof', 'Lane Departure Warning', 'Adaptive Cruise Control'],
    isAvailable: true
  },
  {
    make: 'Ford',
    model: 'Mustang',
    year: 2020,
    price: 35000,
    mileage: 25000,
    fuelType: 'Gasoline',
    transmission: 'Manual',
    imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZCUyMG11c3Rhbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Sporty Ford Mustang with powerful engine. Comes with premium sound system, sport mode, and performance tires.',
    features: ['Premium Sound System', 'Sport Mode', 'Performance Tires', 'Rear Spoiler'],
    isAvailable: true
  },
  {
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 45000,
    mileage: 5000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Nearly new Tesla Model 3 with autopilot capabilities. Features include premium interior, glass roof, and long-range battery.',
    features: ['Autopilot', 'Premium Interior', 'Glass Roof', 'Long Range Battery'],
    isAvailable: true
  },
  {
    make: 'BMW',
    model: '3 Series',
    year: 2021,
    price: 38000,
    mileage: 18000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwM3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Luxury BMW 3 Series with premium features. Includes heated seats, navigation system, and premium sound system.',
    features: ['Heated Seats', 'Navigation System', 'Premium Sound System', 'Parking Sensors'],
    isAvailable: true
  },
  {
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2022,
    price: 42000,
    mileage: 12000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1617814076668-8dfc6fe159ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVyY2VkZXMlMjBjJTIwY2xhc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Elegant Mercedes-Benz C-Class with luxury features. Includes leather interior, panoramic sunroof, and advanced driver assistance.',
    features: ['Leather Interior', 'Panoramic Sunroof', 'Driver Assistance Package', 'Ambient Lighting'],
    isAvailable: true
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/autohaven', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    
    // Clear existing cars
    await Car.deleteMany({});
    console.log('Existing cars removed');
    
    // Insert new cars
    await Car.insertMany(carData);
    console.log('Sample cars added successfully');
    
    // Disconnect
    mongoose.disconnect();
    console.log('Database seeded successfully');
    
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

connectDB();
