import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  DocumentType,
  index,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import log from "../utils/logger";
import { ROLES } from "../utils/userRoles";

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "verified",
];

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await argon2.hash(this.password);

  this.password = hash;

  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ user_name: 1 }, { unique: true })
export class User {
  @prop({ required: true })
  brand_name: string;

  @prop({ required: true, lowercase: true, unique: true })
  user_name: string;

  @prop({ required: true, lowercase: true, unique: true })
  email: string;

  @prop({ required: true })
  phone: string;

  // user role
  @prop({ required: true, default: [ROLES.MERCHANT] })
  roles: string[] = [];

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  // example of product or something else to reference
  // @prop({ ref: "Product" })
  // products: string[] = [];

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      log.error(e, "Could not validate password");
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
