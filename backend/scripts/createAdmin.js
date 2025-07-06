const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');
// Always load .env from the project root
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'admin@everesthemp.com';
const ADMIN_NAME = 'Admin';
const ADMIN_PASSWORD = process.argv[2] || process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('Please provide an admin password as an argument or set ADMIN_PASSWORD env variable.');
  process.exit(1);
}

async function createAdmin() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set. Please check your .env file in the project root.');
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = new User({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: hashedPassword,
    role: 'admin',
  });
  await admin.save();
  console.log('Admin user created successfully.');
  process.exit(0);
}

createAdmin().catch(err => {
  console.error('Error creating admin user:', err);
  process.exit(1);
}); 