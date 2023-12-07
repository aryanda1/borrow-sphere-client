import { Community } from "../models/communityModels";
import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useCreateCommunity() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();
	const createCommunity = async (community: Community) => {
		return axiosPrivateService("api/communities/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(community),
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error;
			});
	};

	return { createCommunity };
}
