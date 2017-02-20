import mongoose from 'mongoose';
import async from 'async'
import ShoppingList from '../models/ShoppingList'
import ShoppingHistory from '../models/ShoppingHistory'

export default {
  new: (id) => new Promise((resolve, reject) => {
    ShoppingList.findById(id).exec((err, shoppingList) => {
      // console.log("input: ",id, err, shoppingList);
      if (!shoppingList) {
        const newShoppingList = new ShoppingList({_id: id})
        newShoppingList.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      }
      else {
        shoppingList.items = []
        shoppingList.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      }
    })
  }),

  insert: (id, storeId) => new Promise((resolve, reject) => {
    ShoppingList.findById(storeId).exec((err, shoppingList) => {
      if (err) reject(err)
      const isInList = shoppingList.items.some((item) => item._item == id)
      if (isInList){
        resolve(shoppingList)
      }
      else {
        shoppingList.items.push({ _item: id })
        shoppingList.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      }
    })
  }),

  remove: (id, storeId) => new Promise((resolve, reject) => {
    ShoppingList.findById(storeId).exec((err, shoppingList) => {
      if (err) reject(err)
      const newItems = shoppingList.items.filter((item) => item._item != id)
      shoppingList.items = newItems
      shoppingList.save((err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  }),

  update: (id, storeId) => new Promise((resolve, reject) => {
    ShoppingList.findById(storeId).exec((err, shoppingList) => {
      if (err) reject(err)
      const index = shoppingList.items.findIndex((item) => item._item == id)
      shoppingList.items[index].checked = !shoppingList.items[index].checked
      shoppingList.save((err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  }),

  getByStoreId: (id) => new Promise((resolve, reject) => {
    ShoppingList.findById(id).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  }),

  transfer: (storeId) => new Promise((resolve, reject) => {
    ShoppingList.findById(storeId).exec((err, shoppingList) => {
      if (err) reject(err)
      const transferredItems = shoppingList.items.filter((item) => item.checked)
      async.each(transferredItems, (transferredItem, callback) => {
        const shoppingHistory = new ShoppingHistory({
          _item: transferredItem._item,
          checked: transferredItem.checked
        })
        // console.log("schema:", shoppingHistory);
        shoppingHistory.save((err, res) => {
          // console.log("res:", res);
          err ? callback(err) : callback()
        })
      }, (err) => {
        if (err) reject(err)
        const uncheckedItems = shoppingList.items.filter((item) => !item.checked)
        shoppingList.items = uncheckedItems
        shoppingList.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    })
  }),

  getHistoryByStoreId: (id) => new Promise((resolve, reject) => {
    ShoppingHistory.find({_store: id}).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  }),

}
