import * as Yup from "yup";

export const signUpSchema = Yup.object({
    firstName: Yup.string().trim().min(2).max(25).required("Please enter your Firstname"),
    lastName: Yup.string().trim().min(1).max(25).required("Please enter your Lastname"),
    mobile: Yup.string().trim()
        .required("Please enter your mobile number")
        .min(10, "Mobile number must be 10 digits")
        .max(10, "Mobile number must be 10 digits"),

    email: Yup.string().trim().email().required("Please enter your email"),
    password: Yup.string().trim().min(6).required("Please enter your password"),
    confirm_password: Yup.string().trim()
        .required()
        .oneOf([Yup.ref("password"), null], "Password must match"),
});