import express from "express";
import cors from "cors";
import connectDB from "./db.js";

import {
  addItem,
  findItem,
  updateItem,
  deleteItem,
  listItems,
} from "./controllers/itemController.js"; // import controllers (cruD)

const app = express();
const PORT = 3000;

//enable cors
app.use(cors());

//middleware to parse json request body
app.use(express.json());

// connect to mongoDB
connectDB();

// API Routes
app.get("/", (req, res) => {
  res.send("API is working! 🚀");
});

// Search for items by title or description
app.get("/api/items/search", async (req, res) => {
  const { query } = req.query; // Get the query parameter (keyword)

  if (!query) {
    return res.status(400).json({ error: "Please provide a search query" });
  }

  try {
    // Create a case-insensitive regex search
    const search = new RegExp(query, "i");

    // Find items where title or description matches the query
    const items = await Item.find({
      $or: [{ title: { $regex: search } }, { description: { $regex: search } }],
    });

    // Return the found items as a response
    res.json(items);
  } catch (error) {
    console.error("Error occurred while searching for items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// start server
app.listen(PORT, () =>
  console.log(`server is running on -> http://localhost:${PORT} 🔌✅`)
);
