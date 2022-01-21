const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  offer: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  productPicture: [
    { img: { type: String } },
  ],
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ' User ',
        reviews: String,
      },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ' User ',
  },
  updatedAt: Date,
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
