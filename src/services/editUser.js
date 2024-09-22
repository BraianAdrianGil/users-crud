import { axiosInstance } from "../api/axiosInstance";

export const editUser = async ({ userId, newData }) => {
	try {
		console.log(newData);
		await axiosInstance.put(`/users/${userId}/`, newData);
	} catch (error) {
		console.error(error);
	}
};
