import * as Yup from "yup";

export const categorySchema = Yup.object({
    category: Yup.string().trim().min(4).required("Please enter your category name"),
    image: Yup.string()
        .matches(/\.(jpg|jpeg|png)$/, "Invalid image format. Only JPG, JPEG, and PNG are allowed.")
        .required("Please upload an image.")
});