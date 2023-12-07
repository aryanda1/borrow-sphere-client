import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useFetchRequestDetails() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
	const fetchRequestDetails = async (requestId: string) => {
		return axiosPrivateService("/api/requests/fetchdetails", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				requestId: requestId,
			},
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});
	};

	return { fetchRequestDetails };
}
