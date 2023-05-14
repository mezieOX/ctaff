import { object, string, ObjectSchema } from "yup";
import { PersonalDetailsInterface } from "../interfaces/forms.interface";

const requiredMessage = "is required";

export const PersonalDetailsSchema: ObjectSchema<PersonalDetailsInterface> = object({
  firstname: string().trim().required(`firstname ${requiredMessage}`),
  lastname: string().trim().required(`lastname ${requiredMessage}`),
  city: string().trim().required(`city ${requiredMessage}`),
  state: string().trim().required(`state ${requiredMessage}`),
  country: string().trim().required(`country ${requiredMessage}`),
  occupation: string().trim().required(`occupation ${requiredMessage}`),
  gender: string().trim().required(`gender ${requiredMessage}`),
  phone: string().trim().required(`phone ${requiredMessage}`),
  address: string().trim().required(`address ${requiredMessage}`),
  // email: string()
  //   .required(`email ${requiredMessage}`)
  //   .email("invalid email address")
  //   .trim(),
});
