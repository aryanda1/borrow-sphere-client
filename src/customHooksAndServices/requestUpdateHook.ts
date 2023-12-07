import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useRequestUpdate() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();

	const updateRequest = async (updateDetails: {
		updateType: string;
		requestId: string;
	}) => {
		return axiosPrivateService("/api/requests/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(updateDetails),
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});
	};

	return { updateRequest };
}
