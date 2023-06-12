import * as Yup from "yup";

export const categorySchema = Yup.object({
    category: Yup.string().trim().min(4).required("Please enter your category name"),

});