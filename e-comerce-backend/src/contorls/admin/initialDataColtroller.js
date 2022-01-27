/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const CategoryModel = require('../../models/categoryModel');
const ProductModel = require('../../models/productModel');

const createCategory = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId === undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (const cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      type: cate.type,
      parentId: cate.parentId,
      children: createCategory(categories, cate._id),
    });
  }
  return categoryList;
};

exports.initialData = async (req, res) => {
  const categories = await CategoryModel.find({}).exec();
  const products = await ProductModel.find({})
    .select('_id name description price slug productPicture quantity category')
    .populate('category');
  res.status(200).json({
    categories: createCategory(categories),
    products,
  });
};
