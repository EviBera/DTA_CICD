import { createApp } from "./src/app.js";
import { join, dirname } from "node:path";
import { createStore } from "./src/file-store.js";   //DI
import { AppError } from "./src/app-error.js";
import { fileURLToPath } from 'url';


// Get the current module directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STORE_PATH = join(__dirname,'todos.json');
const todoStore = createStore(STORE_PATH);

try {
  createApp(todoStore, process.argv); 
} catch (error) {
  if (error instanceof AppError) {
    console.error(error.message);
  } else {
    console.error(error);
  }
}
