import * as Yup from 'yup'

export const changePasswordSchema = Yup.object().shape({
oldPassword: Yup.string().trim()
    .required('Old Password is mandatory')
    .min(8, 'Invalid old password'),
newPassword: Yup.string().trim()
    .required('New Password is mandatory')
    .min(8, 'Password must be at least 8 characters long'),
confirmNewPwd: Yup.string().trim()
    .required('Password is mandatory')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
})
