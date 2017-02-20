import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import random from 'mongoose-simple-random'

const Schema = mongoose.Schema;

const InventoryItemSchema = new Schema({
  _store: {type: String, ref: 'Store', required: true },
  name: { type: String, required: true },
  secondaryName: String,
  unit: String,
  description: String,
  categories: Number,
  latestPurchasedDate: Date
},
{
  timestamps: true
});

InventoryItemSchema.plugin(random)
export default mongoose.model('InventoryItem', InventoryItemSchema)
