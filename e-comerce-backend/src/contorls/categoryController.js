/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable keyword-spacing */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */

/* eslint-disable consistent-return */
const slugify = require('slugify');
const CategoryModel = require('../models/categoryModel');

const createCategory = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId === undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategory(categories, cate._id),
    });
  }
  return categoryList;
};

exports.addCategory = (req, res) => {
  const { name, parentId } = req.body;
  const categoryObj = {
    name,
    slug: slugify(name),
  };

  if (parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  if (req.file) {
    if (req.file.originalname) {
      categoryObj.categoryImage = `${process.env.APINAME}${req.file.filename}`;
    }
  }

  const cat = new CategoryModel(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({
        msg: 'category added sucessfully',
        category,
      });
    }
  });
};

exports.getCategories = async (req, res) => {
  try {
    const findCategories = await CategoryModel.find({});
    const categoryList = createCategory(findCategories);
    res.status(200).json({
      categories: categoryList,
    });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

// update Category
exports.updateCategories = async (req, res) => {
  try {
    const {
      _id, name, parentId, type,
    } = req.body;
    const updatedCategorires = [];
    if (name instanceof Array) {
      for (let i = 0; i < name.length; i++) {
        const category = {
          name: name[i],
          type: type[i],
        };
        if (parentId[i] !== '') {
          category.parentId = parentId[i];
        }
        const updatedCategory = await CategoryModel.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
        updatedCategorires.push(updatedCategory);
      }
      return res.status(200).json({
        updatedCategorires,
      });
    } else{
      const category = {
        name,
        type,
      };
      if (parentId !== '') {
        category.parentId = parentId;
      }
      const updatedCategory = await CategoryModel.findByIdAndUpdate({ _id }, category, { new: true });
      updatedCategorires.push(updatedCategory);
    }
    return res.status(200).json({
      updatedCategorires,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

// delete category

exports.deleteCategories = async (req, res) => {
  const deletedCategories = [];
  try {
    const { checked } = req.body;
    if(checked.length <= 0) {
      return res.status(400).json({ message: 'please selete a category' });
    }
    for (let i = 0; i < checked.length; i++) {
      const deleteCategory = await CategoryModel.findByIdAndDelete({ _id: checked[i] });
      deletedCategories.push(deleteCategory);
    }
    if(deletedCategories.length == checked.length) {
      return res.status(200).json({ message: 'catagories had deleted' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
