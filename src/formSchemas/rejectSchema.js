import * as Yup from "yup";

export const rejectSchema = Yup.object({
    reason: Yup.string().trim().min(10).max(100).required("Please enter the reason for rejection"),
});