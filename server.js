import express from "express";
import { productsRouter } from "./routes/products.router.js";

const app = express();

const PORT = 8000;

app.use(express.static("public"));

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
