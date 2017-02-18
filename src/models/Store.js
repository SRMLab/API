// require mongoose
import mongoose from 'mongoose'
mongoose.Promise = global.Promise
// create the schema
const Schema = mongoose.Schema;
const StoreSchema = new Schema({
  name: { type: String, required: true },
  email: String,
  _menus: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
}, {
  timestamps: true
});
// register the schema as a model
export default mongoose.model('Store', StoreSchema);
