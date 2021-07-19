const Product = require('../models/Product');
const catchAsync = require('../middleware/catchAsync');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Route:       GET /api/products
 * Description: Get all products
 * Access:      Public
 */
exports.getProducts = catchAsync(async (req, res, next) => {
  let filter = req.query && req.query.filter;
  let products;
  if (filter === 'featured') {
    products = await Product.find({ isFeatured: true });
  } else {
    products = await Product.find();
  }

  return res
    .status(200)
    .json({ success: true, count: products.length, products });
});

/**
 * Route:       GET /api/products/:id
 * Description: Get single product
 * Access:      Public
 */
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse('Produto não encontrado', 404));
  }

  return res.status(200).json({ success: true, product });
});

/**
 * Route:       POST /api/products
 * Description: Create a new product
 * Access:      Private/Admin
 */
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({ success: true, product: newProduct });
});

/**
 * Route:       PUT /api/products/:id
 * Description: Update product
 * Access:      Private/Admin
 */
exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse('Produto não encontrado', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({ success: true, product });
});

/**
 * Route:       DELETE /api/products/:id
 * Description: Delete product
 * Access:      Private/Admin
 */
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse('Produto não encontrado', 404));
  }

  await product.remove();

  return res.status(200).json({ success: true, data: {} });
});
