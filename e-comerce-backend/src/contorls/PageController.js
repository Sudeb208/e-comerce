/* eslint-disable no-underscore-dangle */
const PageModel = require('../models/pageModel');

exports.createPage = async (req, res) => {
  try {
    const { banners, products } = req.files;
    console.log(req.files);
    if (banners.length > 0) {
      req.body.banners = banners.map((banner) => ({
        img: `${process.env.APINAME}/${banner.filename}`,
        navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }
    if (products.length > 0) {
      req.body.products = banners.map((product) => ({
        img: `${process.env.APINAME}/${product.filename}`,
        navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
      }));
    }

    req.body.createdBy = req.user._id;
    const page = new PageModel(req.body);
    page.save((error, pages) => {
      if (error) return res.status(500).json({ error: error.message });
      if (pages) {
        return res.status(201).json({ pages });
      }
      return null;
    });
  } catch (error) {
    console.log(error);
  }
};
