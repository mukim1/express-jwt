import { object, string, TypeOf } from "zod";
import { MOBILE_REGEX_BD } from "../utils/helper";

export const createUserSchema = object({
  body: object({
    brand_name: string().nonempty({
      message: "Please enter your brand name",
    }),
    user_name: string()
      .nonempty({
        message: "Please enter a unique user name",
      })
      .min(3, { message: "User name must be at least 3 characters" })
      .max(20, { message: "User name must be at most 20 characters" }),
    email: string().email({
      message: "Please enter a valid email address",
    }),
    phone: string()
      .nonempty({
        message: "Phone is required",
      })
      .regex(MOBILE_REGEX_BD, {
        message: "Phone number is not valid",
      }),
    password: string().nonempty({
      message: "Password is required",
    }),
    password_confirmation: string().nonempty({
      message: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
