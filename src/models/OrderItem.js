import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const Schema = mongoose.Schema;
const OrderItemSchema = new Schema({
  name: { type: String, required: true },
  _menu: {type: Schema.ObjectId, ref: 'Menu'},
  _order: {type: Schema.ObjectId, ref: 'Order'},
  _store: {type: String, ref: 'Store'},
  qty: { type: Number, required: true, default: 0 },
  // unitPrice = sum of extendedPrice of addOns + item's price
  unitPrice: { type: Number, required: true, default: 0 },
  extendedPrice: { type: Number, required: true, default: 0 },
  // isActive: { type: Boolean, required: true, default: false },
  addOns: [{
    name: { type: String, required: true },
    qty: { type: Number, required: true, default: 0 },
    unitPrice: { type: Number, required: true, default: 0 },
    extendedPrice: { type: Number, required: true, default: 0 },
  }]
}, {
  timestamps: true
});

export default mongoose.model('OrderItem', OrderItemSchema);
