const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor insira o nome do produto'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Por favor insira a descrição do produto'],
    },
    price: {
      type: Number,
      required: [true, 'Por favor insira o preço do produto'],
    },
    priceReal: String,
    promo: String,
    image: {
      type: String,
      required: [true, 'Por favor adicione uma imagem'],
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: Number,
    slug: String,
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
