// require mongoose
import mongoose from 'mongoose'
mongoose.Promise = global.Promise
// create the schema
const Schema = mongoose.Schema;
const MenuSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  vegan: Boolean,
  description: String,
  _store: {type: String, ref: 'Store'},
}, {
  timestamps: true
});
// register the schema as a model
export default mongoose.model('Menu', MenuSchema);
