import mongoose from 'mongoose';
import InventoryItem from '../models/InventoryItem'

export default {
  getAll: (storeId) => new Promise((resolve, reject) => {
    InventoryItem.find({_store: storeId}).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  }),

  getById: (id) => new Promise((resolve, reject) => {
    InventoryItem.findById(id).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  }),

  insert: (item) => new Promise((resolve, reject) => {
    const newItem = new InventoryItem(item)
    newItem.save((err, res) => {
      err ? reject(err) : resolve(res)
    })
  }),

  update: (id, updatable) => new Promise((resolve, reject) => {
    InventoryItem.findByIdAndUpdate(
      id,
      { $set: {...updatable} },
      { new: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  }),

  remove: (id) => new Promise((resolve, reject) => {
    InventoryItem.findByIdAndRemove(id).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })

}
