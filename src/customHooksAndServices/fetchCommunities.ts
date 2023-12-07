import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useFetchCommunities() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
	const fetchCommunities = async () => {
		return axiosPrivateService("/api/communities/fetch", {
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

	return { fetchCommunities };
}
