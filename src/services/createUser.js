import { axiosInstance } from "../api/axiosInstance";

export const createUser = async ({ userData }) => {
	try {
		await axiosInstance.post("/users/", userData);
	} catch (error) {
		console.error("Error fetching create user service", error);
	}
};
