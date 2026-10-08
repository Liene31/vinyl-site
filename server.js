import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { createTable } from "./createTable.js";

const app = express();

const PORT = 8000;

// Create tables before starting server
await createTable();

app.use(express.static("public"));

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
