import * as Yup from "yup";

export const reviewSchema = Yup.object({
    review: Yup.string().trim().min(1).required("Please enter your review"),

}); 