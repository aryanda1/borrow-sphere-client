import axios, { AxiosInstance } from "axios";
// import "dotenv/config";
const axiosService: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	// withCredentials: true,
});

export const axiosPrivateService: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	// withCredentials: true,
});

export default axiosService;
