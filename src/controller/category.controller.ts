import { Request, Response } from "express";
import CategoryModel from "../model/category.model";
import { CreateCategoryInput } from "../schema/category.schema";

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategoryInput>,
  res: Response
) {
  const category = await CategoryModel.create(req.body);
  return res.status(201).json(category);
}
