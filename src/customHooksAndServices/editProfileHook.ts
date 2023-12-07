import { useAxiosPrivateServiceWithInterceptors } from "./useAxiosPrivateHook";

export default function useEditProfile() {
	const axiosPrivateService = useAxiosPrivateServiceWithInterceptors();

	const editProfileInfo = async ({
		editProperty,
		editValue,
	}: {
		editProperty: string;
		editValue: string;
	}) => {
		return axiosPrivateService("/api/editprofile", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				editProperty,
				editValue,
			}),
		})
			.then((data) => {
				return data;
			})
			.catch((err) => {
				return err;
			});
	};

	return { editProfileInfo };
}
