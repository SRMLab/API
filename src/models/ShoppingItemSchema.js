import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import InventoryItem from './InventoryItem'

const Schema = mongoose.Schema

const ShoppingItemSchema = new Schema({
  _item: {
    type: Schema.ObjectId,
    ref: 'InventoryItem'
  },
  checked: { type: Boolean, default: false },
  price: Number,
  purchasedAt: Date
},
{ timestamps: true })

export default ShoppingItemSchema
