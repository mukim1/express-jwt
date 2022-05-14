import mongoose from "mongoose";
// import { string } from "zod";
const { Schema } = mongoose;

const blogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  user:{
    type: String,
    // ref: 'users',
    required: true
  }
},{
    timestamps: true,
});

// blogSchema.path('user').ref('User')

const CategoryModel = mongoose.model("Blog", blogSchema);
export default CategoryModel;

// import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
// import { User } from "./user.model";

// export class Category {
//   @prop()
//   name: string;

//   @prop({ ref: User })
//   user: Ref<User>;

//   @prop()
//   img: string;
// }

// const CategoryModel = getModelForClass(Category, {
//   schemaOptions: {
//     timestamps: true,
//     collection: "categories",
//   },
// });

// export default CategoryModel;
