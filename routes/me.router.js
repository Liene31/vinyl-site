import express from "express";
import { getCurrentUser } from "../controllers/me.controller.js";

export const meRouter = express.Router();

meRouter.get("/", getCurrentUser);
