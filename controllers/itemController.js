import Item from "../models/item.js";

// Add item
const addItem = async (item) => {
  await connectDB(); //make sure db is connected
  try {
    const newItem = await Item.create(item); //add item to db
    console.info("new item added: ", newItem); //clg added item
  } catch (error) {
    console.error("error occured while trying to add item to DB: ", error); //catch errors
  }
};

// Find item by tite
const findItem = async (title) => {
  await connectDB(); // Ensure the connection is established
  try {
    const search = new RegExp(title, "i"); // Make case-insensitive search
    const items = await Item.find({ title: search });
    console.info("Items found:", items); // show the matching items
    console.info(`${items.length} matches`); // log how many matches
  } catch (error) {
    console.error("error occured while trying to find item: ", error); //catch and log errors
  }
};

//update item
const updateItem = async (_id, item) => {
  await connectDB();
  try {
    const updatedItem = await Item.findOneAndUpdate({ _id }, item, {
      new: true, //return updated
    });
    console.info("item updated", updatedItem);
  } catch (error) {
    console.error("error occured while trying to update item: ", error); //catch and log errors
  }
};

//delete item
const deleteItem = async (_id, item) => {
  await connectDB();
  try {
    const deletedItem = await Item.findOneAndDelete({ _id });
    if (deletedItem) {
      console.info("item deleted", deletedItem);
    } else {
      console.info("Item not found");
    }
    console.info("item removed", item);
  } catch (error) {
    console.error("error occured while trying to delete item: ", error); //catch and log errors
  }
};

//list all items

const listItems = async () => {
  await connectDB();
  try {
    const allItems = await Item.find();
    console.info(allItems);
    console.info(`${allItems.length} items`);
  } catch (error) {
    console.error("error occured while trying to find all items: ", error); //catch and log errors
  }
};

// Export methods
export { addItem, findItem, updateItem, deleteItem, listItems };
