import mongoose from "mongoose"; // Import mongoose

// Define item schema
const auctionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  start_price: { type: Number, required: true },
  reserve_price: { type: Number },
});

// Define and export the model
const Item = mongoose.model("Item", auctionItemSchema); // Name the model "Item"

export default Item;
