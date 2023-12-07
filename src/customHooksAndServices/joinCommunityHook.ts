import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useJoinCommunity() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
	const joinCommunity = async (communityId: string) => {
		return axiosPrivateService("api/communities/join", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({ communityId }),
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});
	};

	return { joinCommunity };
}
