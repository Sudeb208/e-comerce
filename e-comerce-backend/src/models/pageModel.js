const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  descrption: {
    type: String,
    required: true,
    trim: true,
  },
  banners: [
    {
      img: {
        type: String,
      },
      navigateTo: { type: String },
    },
  ],
  products: [
    {
      img: {
        type: String,
      },
      navigateTo: { type: String },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const PageModel = mongoose.model('Page', pageSchema);

module.exports = PageModel;
