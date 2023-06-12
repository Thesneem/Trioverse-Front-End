import * as Yup from "yup";

export const profileUpdateSchema = Yup.object({
    firstName: Yup.string().trim().min(2).max(25).required("Please enter your Firstname"),
    lastName: Yup.string().trim().min(1).max(25).required("Please enter your Lastname"),
    userName: Yup.string().trim().min(4).max(25).required("Please enter your Username"),
    place: Yup.string().trim().min(2).max(25).required("Please enter your State/Place"),
    about: Yup.string().trim().min(10).max(100).required("Please describe about you"),
});