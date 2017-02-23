import mongoose from 'mongoose';
import async from 'async'
import Order from '../models/Order'

export default {
  new: (storeId, userId) => new Promise((resolve, reject) => {
    const newOrder = new Order({_store: storeId, _user: userId})
    newOrder.save((err, result) => {
      err ? reject(err) : resolve(result)
    })
  }),
  update: (orderId, {...updatables}) => new Promise((resolve, reject) => {
    Order.findByIdAndUpdate(orderId,
      { $set: {...updatables} },
      { new: true }
    ).exec((err, updatedOrder) => {
      err ? reject(err) : resolve(updatedOrder)
    })
  }),
  remove: (orderId) => new Promise((resolve, reject) => {
    Order.findByIdAndRemove(orderId).exec((err, removedOrder) => {
      err ? reject(err) : resolve(removedOrder)
    })
  }),
  getById: (orderId) => new Promise((resolve, reject) => {
    Order.findById(orderId).exec((err, order) => {
      err ? reject(err) : resolve(order)
    })
  }),

}
