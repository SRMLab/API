import mongoose from 'mongoose';
import InventoryItem from '../models/InventoryItem'

let InventoryItemController = {};

InventoryItemController.getAll = () =>
new Promise((resolve, reject) => {
  InventoryItem.find({}).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})

InventoryItemController.getById = (id) =>
new Promise((resolve, reject) => {
  InventoryItem.findById(id).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})

InventoryItemController.insert = (item) =>
new Promise((resolve, reject) => {
  const newItem = new InventoryItem(item)
  newItem.save((err, res) => {
    err ? reject(err) : resolve(res)
  })
})

InventoryItemController.update = (id, updatable) =>
new Promise((resolve, reject) => {
  InventoryItem.findByIdAndUpdate(
    id,
    { $set: {...updatable} },
    { new: true }
  ).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})

InventoryItemController.remove = (id) =>
new Promise((resolve, reject) => {
  InventoryItem.findByIdAndRemove(id).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})


export default InventoryItemController
