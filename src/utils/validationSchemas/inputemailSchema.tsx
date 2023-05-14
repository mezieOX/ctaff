import { object, string, ObjectSchema } from "yup";

export const inputemailSchema = object({
  email: string().email("Invalid Email Address").required("Email is required"),
});
