import { object, string, ObjectSchema } from "yup";

export const updateProfileSchema = object({
  firstname: string().trim(),
  lastname: string().trim(),
  city: string().trim(),
  state: string().trim(),
  country: string().trim(),
  occupation: string().trim(),
  gender: string().nullable(),
  phone: string().trim(),
  address: string().trim(),
  email: string().email("Invalid Email Address")
});
