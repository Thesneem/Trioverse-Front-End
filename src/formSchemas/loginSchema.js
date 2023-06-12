import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().trim().email().required("Please enter your email"),
    password: Yup.string().trim().min(6).required("Please enter your password"),
});