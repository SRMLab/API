import mongoose from 'mongoose'
mongoose.Promise = global.Promise
import ShoppingItemSchema from './ShoppingItemSchema'

export default mongoose.model('ShoppingHistory', ShoppingItemSchema)
