import mongoose from 'mongoose'
mongoose.Promise = global.Promise

import OrderItem from './OrderItem'

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  status: { type: String, required: true, default: 'InCart' },
  // OnCart, Submitted, Taken, Ready, Done
  number: Number,
  _user: {type: Schema.ObjectId, ref: 'User'},
  isStaff: { type: Boolean, required: true, default: false },
  amount: {
    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
  },
  _items: [ {type: Schema.ObjectId, ref: 'OrderItem'} ],
  _store: {type: String, ref: 'Store'},
  typeOfTaken: { type: String, required: true, default: 'Online' },
  // Online, Phone, InPerson
  isTakeOut: { type: Boolean, required: true, default: true },
  isReserved: { type: Boolean, required: true, default: false },
  reservedAt: { type: Date },
  isPaid: { type: Boolean, required: true, default: false },
  customer: {
    firstName: String,
    lastName: String
  },
  payment: {
    total: Number,
    items: [{
      type: String, // Credit, Cash, Point
      amount: Number
    }]
  }
}, {
  timestamps: true
});

export default OrderSchema
