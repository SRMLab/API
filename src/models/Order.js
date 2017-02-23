import mongoose from 'mongoose'
mongoose.Promise = global.Promise

import OrderSchema from './OrderSchema'

export default mongoose.model('Order', OrderSchema);
