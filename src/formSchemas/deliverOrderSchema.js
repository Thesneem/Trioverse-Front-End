import * as Yup from "yup";

export const deliverOrderSchema = Yup.object({
    deliveryMessage: Yup.string().trim().min(2).required("Please enter a delivery Message"),
    deliveryItem: Yup.mixed().required('This is a mandatory field').test("fileType", "Invalid file type", function (value) {
        if (value && value instanceof File) {
            const allowedExtensions = ["doc", "docx", "pdf", "txt", 'png', 'jpeg', 'jpg'];
            const fileExtension = value.name.split(".").pop().toLowerCase();
            return allowedExtensions.includes(fileExtension);
        }
        return true;
    }),
})