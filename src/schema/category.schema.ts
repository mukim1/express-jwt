import { object, optional, string, TypeOf } from "zod";

export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(3, "Name must be at least 3 characters"),
    img: optional(string()),
  }),
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>["body"];
