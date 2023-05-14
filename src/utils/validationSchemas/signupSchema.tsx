// const Joi = require('joi');

// export function validateSignUpDetails () {
//     const schema = Joi.object({
//       firstname: Joi.string().min(2).required(),
//       lastname: Joi.string().required(),
//       email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: false } })
//         .required(),
//       password: Joi.string().min(8).required(),
//     });

//    return schema
// }

// // let valid = schema.validate({ firstname: 'abc', lastname: "bulaba"})

import { object, string, setLocale } from "yup";


export function validateSignUpDetails () {
    let schema = object({
      firstname: string().trim().min(2, {firstname: "firstname should be at least 2 characters"}).required(),
      lastname: string().trim().required(),
      email: string().trim().email({email: "email is required"}).required(),
      password: string().trim().min(8, {password: "password should be at least 8 characters"}).required(),
    });

   return schema
}
