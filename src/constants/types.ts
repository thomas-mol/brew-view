import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";
import * as Coffee from "../constants/enums";

// * SIGN UP

export const signUpSchema = z
  .object({
    email: z.string().email(),
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." }),
    password: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

// * LOG IN

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TLoginSchema = z.infer<typeof logInSchema>;

// * ADD / EDIT REVIEW

export const reviewSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters" }),
  roast: z.nativeEnum(Coffee.Roast),
  type: z.nativeEnum(Coffee.Type),
  location: z.string(),
  score: z.number().min(1).max(5),
  date: z.instanceof(dayjs as unknown as typeof Dayjs),
});

export type TReviewSchema = z.infer<typeof reviewSchema>;

// * ADD / EDIT REPLY

export const replySchema = z.object({
  text: z.string().min(1, { message: "Reply can not be empty." }),
});

export type TReplySchema = z.infer<typeof replySchema>;
