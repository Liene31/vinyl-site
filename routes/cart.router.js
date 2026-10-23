import express from "express";
import { cartController } from "../controllers/cart.controller.js";

export const cartRouter = express.Router();

cartRouter.post("/add", cartController.addToCart);
cartRouter.get("/cart-count", cartController.getCartCount);
