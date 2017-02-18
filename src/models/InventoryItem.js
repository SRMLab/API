import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const CATEGORIES = [
  { 0: "Produces" },
  { 1: "Crops" },
  { 2: "Beverages" },
  { 3: "Meat" },
]

const InventoryItemSchema = new Schema({
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

export default mongoose.model('InventoryItem', InventoryItemSchema)
