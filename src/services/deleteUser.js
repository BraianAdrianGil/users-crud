import { axiosInstance } from "../api/axiosInstance";

export const deleteUser = async ({ userId }) => {
	try {
		await axiosInstance.delete(`/users/${userId}/`);
	} catch (error) {
		console.error(error);
	}
};
