import * as Yup from "yup";

export const createSellerSchema = Yup.object({
    occupation: Yup.string().trim().min(2).required("Please enter Occupation"),
    experience: Yup.number().required("Please enter your experience in years").positive("Experience must be a positive number"),
    education: Yup.string().trim().min(2).required("Please enter your education qualification"),
    personal_Website: Yup.string().trim().url("Invalid website link"),
    // social_media_platform: Yup.string()("Please choose a social media platform"),
    social_media_links: Yup.string().when("social_media_platform", {
        is: (platform) => !!platform, // Check if social_media_platform is selected
        then: Yup.string().required("Please provide the social media link"),
        otherwise: Yup.string(), // No validation if social_media_platform is not selected
    }),
    skills: Yup.string().trim().min(2).required("Please enter your skills"),
    idProof: Yup.mixed().test("fileType", "Invalid file type", function (value) {
        if (value && value instanceof File) {
            const allowedExtensions = ["doc", "docx", "pdf", "txt"];
            const fileExtension = value.name.split(".").pop().toLowerCase();
            return allowedExtensions.includes(fileExtension);
        }
        return true;
    }),
});