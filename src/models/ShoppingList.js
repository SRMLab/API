import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import ShoppingItemSchema from './ShoppingItemSchema'

const Schema = mongoose.Schema

const ShoppingListSchema = new Schema({
  _id: {type: String, ref: 'Store', required: true },
  items: [ ShoppingItemSchema ]
})

export default mongoose.model('ShoppingList', ShoppingListSchema)
