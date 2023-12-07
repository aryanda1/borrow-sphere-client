import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";
import { RequestCreationData } from "../models/requestModels";

export default function useCreateRequest() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
	const createRequest = async (requestCreationData: RequestCreationData) => {
		return axiosPrivateService("/api/requests/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(requestCreationData),
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});
	};

	return { createRequest };
}
