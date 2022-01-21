/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const slugify = require('slugify');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

exports.createProduct = (req, res) => {
  try {
    const {
      name, price, description, quantity, category,
    } = req.body;
    let productPicture;
    if (req.files.length > 0) {
      productPicture = req.files.map((file) => ({ img: file.filename }));
    }
    const productObj = {
      name,
      price,
      slug: slugify(name),
      quantity,
      description,
      productPicture,
      category,
      createdBy: req.user._id,
    };
    const product = new Product(productObj);
    product.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      if (data) {
        return res.status(201).json({
          product: data,
        });
      }
      return true;
    });
    // res.status(200).json({
    //   file: req.files, body: req.body,
    // });
  } catch (error) {
    res.status(400).json({
      error,

    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const findProducts = await Product.find({});
    res.status(200).json({
      categories: findProducts,
    });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
  return true;
};

exports.getProductByCategory = async (req, res) => {
  const { category } = req.params;
  Category.findOne({ name: category }).select('_id').exec((error, category) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        error: error.message,
      });
    }
    if (category) {
      Product.find({ category }).exec((error, products) => {
        if (error) {
          res.status(400).json({
            error: error.message,
          });
        }
        res.status(200).json({
          products,
          productByPrice: {
            productUnder5k: products.filter((product) => product.price <= 5000),
            productUnder10k: products.filter((product) => product.price > 5000 && product.price <= 10000),
            productUnder15k: products.filter((product) => product.price > 10000 && product.price <= 15000),
            productUnder20k: products.filter((product) => product.price > 15000 && product.price <= 20000),
            productUnder30k: products.filter((product) => product.price > 20000 && product.price <= 30000),
            productUpper30k: products.filter((product) => product.price > 30000),
          },
        });
      });
    }
  });
};
