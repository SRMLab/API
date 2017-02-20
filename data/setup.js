import { stores, menus, inventoryItems } from '../data/data'
import async from 'async'

import Store from '../src/models/Store'
import Menu from '../src/models/Menu'
import InventoryItem from '../src/models/InventoryItem'

export default (done) => {
  async.waterfall([
    (cb) => {
      Store.remove({}, (err) => {
        cb(null)
      })
    },
    (cb) => {
      Menu.remove({}, (err) => {
        cb(null)
      })
    },
    (cb) => {
      InventoryItem.remove({}, (err) => {
        cb(null)
      })
    },
    (cb) => {
      async.each(stores, (store, callback) => {
        const newStore = new Store(store);
        newStore.save((err => {
          // console.log("store insert");
          callback()
        }))
      }, cb(null))
    },
    (cb) => {
      async.each(menus, (menu, callback) => {
        const newMenu = new Menu(menu);
        newMenu.save((err => {
          // console.log("store insert");
          callback()
        }))
      }, cb(null))
    },
    (cb) => {
      async.each(inventoryItems, (inventoryItem, callback) => {
        const newItem = new InventoryItem(inventoryItem);
        newItem.save(( err => {
          // console.log("item insert");
          callback()
        }))
      }, cb(null))
    }
  ], done)
}
