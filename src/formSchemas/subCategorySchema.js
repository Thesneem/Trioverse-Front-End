import * as Yup from "yup";

export const subcategorySchema = Yup.object({
    subcategory: Yup.string().min(4).required("Please enter your subcategory name"),
    category: Yup.string().required('Category is required').nullable()
});