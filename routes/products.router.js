import { Router } from "express";
import { productsController } from "../controllers/productsControllers.js";

export const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/genres", productsController.getGenres);
