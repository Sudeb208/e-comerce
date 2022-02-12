/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
// const CartModel = require('../models/cardModel');

// exports.addItemToCart = (req, res) => {
//   CartModel.findOne({ user: req.user._id })
//     .exec((error, cart) => {
//       if (error) {
//         return res.status('400').json({ message: error.message });
//       }
//       if (cart) {
//         // if cart allready exit then update the cart by quantity
//         const isitemAdded = cart.cartItems.find((c) => c.product == req.body.cartItems.product);
//         if (isitemAdded) {
//           CartModel.findOneAndUpdate
//  ({ user: req.user._id, 'cartItems.product': req.body.cartItems.product }, {
//             $set: {
//               cartItems: {
//                 ...req.body.cartItems,
//                 quantity: isitemAdded.quantity + req.body.cartItems.quantity,
//               },
//             },
//           }).exec((errors, _cart) => {
//             if (errors) {
//               return res.status('400').json({ message: errors.message });
//             }
//             if (_cart) {
//               return res.status(201).json({ cart: _cart });
//             }
//           });
//         } else {
//           CartModel.findOneAndUpdate({ user: req.user._id }, {
//             $push: {
//               cartItems: req.body.cartItems,
//             },
//           }).exec((errors, _cart) => {
//             if (errors) {
//               return res.status('400').json({ message: errors.message });
//             }
//             if (_cart) {
//               return res.status(201).json({ cart: _cart });
//             }
//           });
//         }
//         // res.status(200).json({ cart, massage: ' card allready exit ' });
//       } else {
//         //  if cart not exit then create a cart
//         const cart = new CartModel({
//           user: req.user._id,
//           cartItems: [req.body.cartItems],
//           price: req.body.price,
//         });
//         cart.save((error, data) => {
//           if (error) {
//             return res.status('400').json({ message: error.message });
//           }
//           if (data) {
//             return res.status(201).json({ cart: data });
//           }
//           return true;
//         });
//       }
//       return true;
//     });
// };

const Cart = require('../models/cardModel');

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    // you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      // if cart already exists then update cart by quantity
      const promiseArray = [];

      req.body.cartItems.forEach((cartItem) => {
        const { product } = cartItem;
        const item = cart.cartItems.find((c) => c.product == product);
        let condition; let
          update;
        if (item) {
          condition = { user: req.user._id, 'cartItems.product': product };
          update = {
            $set: {
              'cartItems.$': cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }
        promiseArray.push(runUpdate(condition, update));
        // Cart.findOneAndUpdate(condition, update, { new: true }).exec();
        // .exec((error, _cart) => {
        //     if(error) return res.status(400).json({ error });
        //     if(_cart){
        //         //return res.status(201).json({ cart: _cart });
        //         updateCount++;
        //     }
        // })
      });
      Promise.all(promiseArray)
        .then((response) => res.status(201).json({ response }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      // if cart not exist then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};

// exports.addToCart = (req, res) => {
//     const { cartItems } = req.body;
//     if(cartItems){
//        if(Object.keys(cartItems).length > 0){
//            Cart.findOneAndUpdate({
//                "user": req.user._id
//            }, {
//                "cartItems": cartItems
//            }, {
//                 upsert: true, new: true, setDefaultsOnInsert: true
//            }, (error, cartItems) => {
//                if(error) return res.status(400).json({ error });
//                if(cartItems) res.status(201).json({ message: 'Added Successfully' });
//            })
//        }
//        //res.status(201).json({ cartItems });
//     }else{
//         //res.status(201).json({ req });
//     }
// }

exports.getCartItems = (req, res) => {
  // const { user } = req.body.payload;
  // if(user){
  Cart.findOne({ user: req.user._id })
    .populate('cartItems.product', '_id name price productPicture')
    .exec((error, cart) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      if (cart) {
        const cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPicture[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
};

// new update remove cart items
exports.removeCartItems = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Cart.update(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      },
    ).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  }
};
