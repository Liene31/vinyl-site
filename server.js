import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { authRouter } from "./routes/auth.router.js";
import session from "express-session";
import { meRouter } from "./routes/me.router.js";
import { cartRouter } from "./routes/cart.router.js";

const app = express();

const { SECRET, PORT } = process.env;

app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  }),
);

app.use("/api/products", productsRouter);
app.use("/api/auth/me", meRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}`);
});
