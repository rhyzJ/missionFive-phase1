import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import Item from "./models/item.js";

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
  const { keyword } = req.query; // Access query parameters

  console.log("search keyword:", keyword); // log the keyword to the console

  if (!keyword) {
    return res.status(400).json({ error: "please provide a search keyword" });
  }

  try {
    const search = new RegExp(keyword, "i"); //case insensitve regex search

    // find items where title or description matches keyword
    const items = await Item.find({
      $or: [{ title: { $regex: search } }, { description: { $regex: search } }],
    });

    // return the found items as a response
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
