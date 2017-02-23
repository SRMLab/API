import mongoose from 'mongoose'
import async from 'async'
import Cart from '../models/Cart'
import Order from '../models/Order'

const initailizeCart = (cart) => {
  cart.items = []

}

export default {
  new: (userId) => new Promise((resolve, reject) => {
    Cart.findById(userId).exec((err, cart) => {
      if (!cart) {
        const newCart = new Cart({_id: userId})
        newCart.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      }
      else {
        initailizeCart(cart)
        cart.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      }
    })
  }),
}
