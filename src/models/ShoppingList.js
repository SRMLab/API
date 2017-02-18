import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import InventoryItem from './InventoryItem'

const Schema = mongoose.Schema

const ShoppingItemSchema = new Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryItem'
  },
  checked: Boolean
},
{
  timestamps: true
})

const ShoppingListSchema = new Schema({
  items: [ ShoppingItemSchema ]
},
{
  timestamps: true
})

export default mongoose.model('ShoppingList', ShoppingListSchema)
