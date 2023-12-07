import "../componentSpecificStyles/createCommunityStyles.css";
import { useState, useEffect } from "react";
import useCreateCommunity from "../customHooksAndServices/createCommunityHook";
import { Community } from "../models/communityModels";
import { useNavigate } from "react-router-dom";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import { motion } from "framer-motion";

export default function CreateCommunity() {
	const [communityName, setCommunityName] = useState("");
	const [communityId, setCommunityId] = useState("");
	const [communityDescription, setCommunityDescription] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitudeNumeric, setLatitudeNumeric] = useState(0);
	const [longitudeNumeric, setLongitudeNumeric] = useState(0);
	const [latitudeInvalid, setLatitudeInvalid] = useState(false);
	const [longitudeInvalid, setLongitudeInvalid] = useState(false);

	const { createCommunity } = useCreateCommunity();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (latitude && isNaN(latitude as any)) {
			setLatitudeInvalid(true);
		} else {
			setLatitudeInvalid(false);
			setLatitudeNumeric(Number(latitude));
		}
		if (longitude && isNaN(longitude as any)) {
			setLongitudeInvalid(true);
		} else {
			setLongitudeInvalid(false);
			setLongitudeNumeric(Number(longitude));
		}
	}, [latitude, longitude]);

	const handleCreateCommunity = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!communityName ||
			!communityId ||
			!communityDescription ||
			!latitudeNumeric ||
			!longitudeNumeric
		) {
			return;
		}
		if (latitudeInvalid || longitudeInvalid) {
			return;
		}
		if (latitudeNumeric < -90 || latitudeNumeric > 90) {
			return;
		}
		if (longitudeNumeric < -180 || longitudeNumeric > 180) {
			return;
		}

		const requestObj: Community = {
			name: communityName,
			id: communityId,
			description: communityDescription,
			latitude: latitudeNumeric,
			longitude: longitudeNumeric,
		};

		const response = await createCommunity(requestObj);

		if (response.status === 201) {
			navigateTo("/community-created-successfully");
		} else {
			alert(response.response.data);
		}
	};

	return (
		<>
			<motion.div
				className="flex flex-col items-center"
				variants={PageTransitionVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600 text-center">
					Create a new community
				</h1>
				<div className="flex flex-col items-center form-wrapper w-3/5">
					<form
						className="mt-1 flex flex-col items-center w-full"
						onSubmit={handleCreateCommunity}
					>
						<div className="input-set">
							<label>Community name</label>
							<input
								value={communityName}
								onChange={(e) => setCommunityName(e.target.value)}
								type="text"
								placeholder="Enter a name for the community"
								required
							/>
						</div>
						<div className="input-set">
							<label>Community ID</label>
							<input
								value={communityId}
								onChange={(e) => setCommunityId(e.target.value)}
								type="text"
								placeholder="Enter a unique ID for the community"
								required
							/>
						</div>
						<div className="input-set">
							<label>Community description</label>
							<input
								value={communityDescription}
								onChange={(e) => setCommunityDescription(e.target.value)}
								type="text"
								placeholder="Enter a short description of the community (who/what is it for, etc.)"
								required
							/>
						</div>
						<div className="coordinates-input">
							<div className="latitude-input-set">
								<label>Latitude</label>
								<input
									value={latitude || ""}
									onChange={(e) => setLatitude(e.target.value)}
									type="text"
									placeholder="Enter the latitude of the community's location"
									required
								/>
								{latitudeInvalid && (
									<p className="text-white text-xs">
										Latitude must be a number
									</p>
								)}
								{(latitudeNumeric > 90 || latitudeNumeric < -90) && (
									<p className="text-white text-xs">
										Latitude's numeric value must be between -90 and 90.
									</p>
								)}
							</div>
							<div className="latitude-input-set">
								<label>Longitude</label>
								<input
									value={longitude || ""}
									onChange={(e) => {
										setLongitude(e.target.value);
									}}
									type="text"
									placeholder="Enter the longitude of the community's location"
									required
								/>
								{longitudeInvalid && (
									<p className="text-white text-xs">
										Longitude must be a number
									</p>
								)}
								{(longitudeNumeric > 180 || longitudeNumeric < -180) && (
									<p className="text-white text-xs">
										Longitude's numeric value must be between -180 and 180.
									</p>
								)}
							</div>
						</div>
						<button
							disabled={
								!(
									communityName &&
									communityId &&
									communityDescription &&
									latitude &&
									longitude
								) ||
								latitudeInvalid ||
								longitudeInvalid ||
								latitudeNumeric > 90 ||
								latitudeNumeric < -90 ||
								longitudeNumeric > 180 ||
								longitudeNumeric < -180
							}
						>
							<span>Create</span>
						</button>
					</form>
				</div>
			</motion.div>
		</>
	);
}
