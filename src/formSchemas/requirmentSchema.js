import * as Yup from "yup";

export const requirmentSchema = Yup.object({
    requirement: Yup.string().min(2).required("Please fill this field"),

}); 