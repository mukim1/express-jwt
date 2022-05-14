import express from "express";
import { createCategoryHandler } from "../controller/category.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createCategorySchema } from "../schema/category.schema";

const router = express.Router();

router.post(
  "/category",
  validateResource(createCategorySchema),
  requireUser,
  createCategoryHandler
);

export default router;
