import { object, string, TypeOf } from "zod";

export const createProductSchema = object({
  body: object({
    name: string().nonempty({
      message: "Please enter a product name",
    }),
    category: string().nonempty({
      message: "Please enter a product category",
    }),
    quantity: string().nonempty({
      message: "Please enter a product quantity",
    }),
    unit_price: string().nonempty({
      message: "Please enter a product unit price",
    }),
    sell_price: string().nonempty({
      message: "Please enter a product sell price",
    }),
    title: string().nonempty({
      message: "Please enter a product title",
    }),
    description: string().nonempty({
      message: "Please enter a product description",
    }),
    img: string().nonempty({
      message: "Please enter a product image",
    }),
    variant: object({}),
    addons: object({}),
  }),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>["body"];
