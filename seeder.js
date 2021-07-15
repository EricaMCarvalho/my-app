const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/database');
const Product = require('./models/Product');
const productData = require('./data/products');

connectDB();

const importData = async () => {
  try {
    await Product.create(productData);
    console.log('Data imported');
    console.log('Disconnecting MongoDB...');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data deleted');
    console.log('Disconnecting MongoDB...');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Argument missing');
  process.exit();
}
