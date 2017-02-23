import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const Schema = mongoose.Schema;
const StoreSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  _menus: [{type: Schema.ObjectId, ref: 'Menu'}],
  businessHours: [[{  // index 0 == Sunday, 1 == Monday
    open: { hour: Number, minuate: Number },
    close: { hour: Number, minuate: Number }
  }]]
}, {
  timestamps: true
});

export default mongoose.model('Store', StoreSchema);
