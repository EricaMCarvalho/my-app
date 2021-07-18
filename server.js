const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const connectDB = require('./config/database');

const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

const app = express();

// const csurfProtection = csurf({
//   cookie: true,
// });

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  app.use(morgan('dev'));
}

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
