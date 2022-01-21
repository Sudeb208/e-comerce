/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const CartModel = require('../models/cardModel');

exports.addItemToCart = (req, res) => {
  CartModel.findOne({ user: req.user._id })
    .exec((error, cart) => {
      if (error) {
        return res.status('400').json({ message: error.message });
      }
      if (cart) {
        // if cart allready exit then update the cart by quantity
        const isitemAdded = cart.cartItems.find((c) => c.product == req.body.cartItems.product);
        if (isitemAdded) {
          CartModel.findOneAndUpdate({ user: req.user._id, 'cartItems.product': req.body.cartItems.product }, {
            $set: {
              cartItems: {
                ...req.body.cartItems,
                quantity: isitemAdded.quantity + req.body.cartItems.quantity,
              },
            },
          }).exec((errors, _cart) => {
            if (errors) {
              return res.status('400').json({ message: errors.message });
            }
            if (_cart) {
              return res.status(201).json({ cart: _cart });
            }
          });
        } else {
          CartModel.findOneAndUpdate({ user: req.user._id }, {
            $push: {
              cartItems: req.body.cartItems,
            },
          }).exec((errors, _cart) => {
            if (errors) {
              return res.status('400').json({ message: errors.message });
            }
            if (_cart) {
              return res.status(201).json({ cart: _cart });
            }
          });
        }
        // res.status(200).json({ cart, massage: ' card allready exit ' });
      } else {
        //  if cart not exit then create a cart
        const cart = new CartModel({
          user: req.user._id,
          cartItems: [req.body.cartItems],
          price: req.body.price,
        });
        cart.save((error, data) => {
          if (error) {
            return res.status('400').json({ message: error.message });
          }
          if (data) {
            return res.status(201).json({ cart: data });
          }
          return true;
        });
      }
      return true;
    });
};
