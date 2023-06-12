import * as Yup from "yup";

export const createListSchema = Yup.object({
    listingTitle: Yup.string().trim().min(2).required("Please enter a listing title"),
    description: Yup.string().trim().min(6).required("Please enter a description for your listing"),
    category: Yup.string().required('Select a category'),
    subcategory: Yup.string().required('Select corresponding subcategory'),
    // delivery_Time: Yup.number().min(1).required('Enter the delivery time in no.of days'),
    // revisions: Yup.number().min(1).required("Enter the no.of allowed revisions."),
    // deliverables: Yup.string().min(10).required("Enter the deliverables"),
    // price: Yup.number().min(1).required("Enter the price"),
    // shortDescription: Yup.string().min(2).required("Enter the features"),
    requirements: Yup.string().min(2).required('Enter the requirement'),
    features: Yup.array().required("Add features of your listing"),
    //coverImage: Yup.required('Add cover Image')
});