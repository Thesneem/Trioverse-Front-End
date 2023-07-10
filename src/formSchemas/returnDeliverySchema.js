import * as Yup from "yup";

export const returnDeliverySchema = Yup.object({
    returnMessage: Yup.string().trim().min(2).required("Please enter the reason for return"),

}); 