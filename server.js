import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { authRouter } from "./routes/auth.router.js";

const app = express();

const PORT = 8000;

app.use(express.static("public"));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
