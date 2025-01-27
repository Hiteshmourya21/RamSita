import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: "/api/v1" ,
    //baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
