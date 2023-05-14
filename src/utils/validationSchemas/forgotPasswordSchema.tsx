import * as Yup from 'yup'

export const forgotPasswordSchema = Yup.object().shape({
password: Yup.string().trim()
    .required('Password is mandatory')
    .min(8, 'Password must be at least 8 characters long'),
confirmPwd: Yup.string().trim()
    .required('Password is mandatory')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
})
