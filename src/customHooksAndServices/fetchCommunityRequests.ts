import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useFetchCommunityRequests() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
	const fetchRequests = async () => {
		return axiosPrivateService("/api/requests/fetch", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});
	};

	return { fetchRequests };
}
