import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://users-crud.academlo.tech"
})