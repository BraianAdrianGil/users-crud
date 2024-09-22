import { axiosInstance } from "../api/axiosInstance";

export const getUsers = async({success,error,loading})=>{
    try {
        loading(true)
        const response = await axiosInstance.get("/users/")
        success(response.data)
        loading(false)
    } catch (err) {
        console.error("Error fetching users data",err);
        error(err)
        loading(false)
    }
}