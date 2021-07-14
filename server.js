const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

if (!process.env.NODE_ENV) {
  dotenv.config();
  app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
