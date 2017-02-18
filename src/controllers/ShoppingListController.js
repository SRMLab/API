import mongoose from 'mongoose';
import ShoppingList from '../models/ShoppingList'

let ShoppingListController = {};

ShoppingListController.getAll = () =>
new Promise((resolve, reject) => {
  ShoppingList.find({}).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})

ShoppingListController.getById = (id) =>
new Promise((resolve, reject) => {
  ShoppingList.findById(id).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})

ShoppingListController.insert = () =>
new Promise((resolve, reject) => {
  ShoppingList.findOne({closed: false}).exec((err, res) => {
    console.log(res);
    // if (err) reject(err)
    // if (res.length === 0) {
    //   const newList = new ShoppingList({})
    //   newList.save((err, res) => {
    //     err ? reject(err) : resolve(res)
    //   })
    // }
    // else 

  })
  // const newList = new ShoppingList({})
})

ShoppingListController.update = (id, updatable) =>
new Promise((resolve, reject) => {
  ShoppingList.findByIdAndUpdate(
    id,
    { $set: {...updatable} },
    { new: true }
  ).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})

ShoppingListController.remove = (id) =>
new Promise((resolve, reject) => {
  ShoppingList.findByIdAndRemove(id).exec((err, res) => {
    err ? reject(err) : resolve(res)
  })
})


export default ShoppingListController
