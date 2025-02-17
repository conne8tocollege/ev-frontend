import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL

export const getSignature = async () => {
    try {
        const { data } = await axios.post(`${apiUrl}/api/cloudinary/generate-signature`);
        return data; // Returns { timestamp, signature }
    } catch (error) {
        console.error("Error generating signature:", error);
        return null;
    }
};

export const uploadImage = async (file) => {
    console.log(file)
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(`${apiUrl}/api/cloudinary/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.url; // Secure URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
