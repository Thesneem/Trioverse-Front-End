import * as Yup from "yup";

export const packageSchema = Yup.object({
    package: Yup.string().trim().min(4).required("Please enter your package name"),

});