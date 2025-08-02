const products = require('../data/products.json');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const Product = require('../models/productModel');
const User = require('../models/userModel');

dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

// Admin Seeder
const seedAdminUser = async () => {
  const adminEmail = "admin@example.com";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: "Admin",
      lastname: " ",
      email: adminEmail,
      password: "admin123",
      role: "admin",
    });

    console.log("Default admin user created");
  } else {
    console.log("Admin user already exists");
  }
};

// Product Seeder
const seedProducts = async () => {
  await Product.deleteMany();
  console.log("Existing products deleted");

  await Product.insertMany(products);
  console.log("Products seeded");
};

// Main CLI Handler
const runSeeder = async () => {
  const arg = process.argv[2];

  if (arg === "--admin") {
    await seedAdminUser();
  } else if (arg === "--products") {
    await seedProducts();
  } else {
    console.log(`
     Please specify a valid seeding option:
    node seeder.js --admin      → Seed only admin user
    node seeder.js --products   → Seed only product data
    `);
  }

  process.exit();
};

runSeeder();