import Inquirer from "inquirer";
import { Command } from "commander";
import {
  addItem,
  findItem,
  deleteItem,
  updateItem,
  listItems,
} from "./controllers/itemController.js";

// Item questions
const questions = [
  {
    type: "input",
    name: "title",
    message: `Item title?`,
  },
  {
    type: "input",
    name: "description",
    message: `Item description`,
  },
  {
    type: "input",
    name: "start_price",
    message: `Starting Price?`,
  },
  {
    type: "input",
    name: "reserve_price",
    message: `Reserve price?`,
  },
];

const program = new Command(); // Create a new Command instance

program.version("1.0.0").description("Item Management System");

// add command
program
  .command("add")
  .alias("a")
  .description("add a new item")
  .action(() => {
    Inquirer.prompt(questions).then((answers) => addItem(answers)); // Use prompt here
  });

//find command
program
  .command("find <title>")
  .alias("f")
  .description("find an item")
  .action((title) => findItem(title));

// update command
program
  .command("update <_id>")
  .alias("u")
  .description("update an item")
  .action((_id) => {
    Inquirer.prompt(questions).then((answers) => updateItem(_id, answers)); // Use prompt here
  });

//delete command
program
  .command("delete <_id>")
  .alias("d")
  .description("delete an item")
  .action((_id) => deleteItem(_id));

//list command
program
  .command("list")
  .alias("l")
  .description("list all items")
  .action(() => listItems());

program.parse(process.argv);
