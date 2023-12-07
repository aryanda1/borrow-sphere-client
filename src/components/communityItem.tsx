import { FrontendUsableCommunityDataWithDistance } from "../models/communityModels";
import useJoinCommunity from "../customHooksAndServices/joinCommunityHook";
import useAuth from "../customHooksAndServices/authContextHook";
import "../componentSpecificStyles/communityItemStyles.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ListItemTransitionVariants from "../framerMotionVariants/listItemTransitionVariants";

export default function CommunityItem({
	community,
}: {
	community: FrontendUsableCommunityDataWithDistance;
}) {
	const { joinCommunity } = useJoinCommunity();
	const { user, setUser } = useAuth();
	const navigateTo = useNavigate();

	const handleJoinCommunity = () => {
		joinCommunity(community.communityId)
			.then((response) => {
				if (response.status === 200) {
					setUser(response.data.updatedUser);
					navigateTo("/community-joined-successfully");
				} else {
					alert(response.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<motion.div
				variants={ListItemTransitionVariants}
				className="border-white border-2 w-full mt-4 p-4 flex flex-row justify-between md:flex-col rounded-3xl"
			>
				<div className="flex flex-col items-start h-full justify-between w-3/5 md:w-full">
					<h1 className="font-bold text-3xl text-fuchsia-600">
						{community.communityName}{" "}
						<span className="text-base">
							({community.distance.toFixed(2)} km)
						</span>
					</h1>
					<h2 className="font-bold text-white text-base text-ellipsis overflow-hidden w-full">
						{community.communityDescription}
					</h2>
				</div>
				<div className="flex flex-col justify-between items-end w-1/3 community-item-buttons md:w-full">
					<button
						className="w-3/5 mt-4 mb-4 md:w-full"
						onClick={handleJoinCommunity}
						disabled={community.communityId === user.community}
					>
						Join community
					</button>
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${community.communityLatitude},${community.communityLongitude}`}
						target="_blank"
						rel="noreferrer"
						className="w-3/5 md:w-full"
					>
						<button className="w-full">View on map</button>
					</a>
				</div>
			</motion.div>
		</>
	);
}
