import axios from "axios";

const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadImage = async (imgFile) => {
	try {
		const newFormData = new FormData();
		newFormData.append("file", imgFile);
		newFormData.append("upload_preset", `${UPLOAD_PRESET}`);
		newFormData.append("api_key", `${API_KEY}`);
		const res = await axios.post(
			`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
			newFormData,
		);

		const data = res.data;

		return data;
	} catch (error) {
		console.error("Error fetching cloudinary upload", error);
	}
};
