/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const PageModel = require('../models/pageModel');

exports.createPage = async (req, res) => {
  try {
    const { banners, products } = req.files;
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
    const categoryId = req.body.category;
    PageModel.findOne({ category: categoryId }).exec((error, page) => {
      if (page) {
        PageModel.findOneAndUpdate({ category: req.body.category }, req.body)
          .exec((error, page) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }
            if (page) {
              return res.status(201).json({ page });
            }
          });
      } else {
        const page = new PageModel(req.body);
        page.save((error, pages) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          if (pages) {
            return res.status(201).json({ pages });
          }
          return null;
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getPage = async (req, res) => {
  try {
    const { category, type } = req.params;

    if (type === 'page') {
      PageModel.findOne({ category }).exec((error, page) => {
        if (error) {
          res.status(500).json({ error });
        }
        if (page === null) {
          res.status(500).json({ error: 'no page available' });
        }
        if (page) {
          return res.status(200).json({
            page,
          });
        }
      });
    } else {
      res.status(500).json({ msg: 'this is not a age' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
