import { FrontendUsableRequestData } from "../models/requestModels";
import "../componentSpecificStyles/requestItemStyles.css";
import { Link } from "react-router-dom";
import ListItemTransitionVariants from "../framerMotionVariants/listItemTransitionVariants";
import { motion } from "framer-motion";

export default function RequestItem({
	request,
}: {
	request: FrontendUsableRequestData;
}) {
	return (
		<motion.div
			className="outer-div w-4/5"
			variants={ListItemTransitionVariants}
			whileHover={{ scale: 1.05, borderRadius: "30px" }}
			whileTap={{ scale: 0.95 }}
		>
			<Link to={`/request-details/${request._id}`} className="enclosing-link">
				<div className="flex flex-row items-center w-full justify-between md:flex-col">
					<h1 className="font-bold text-2xl text-white md:text-2xl">
						{request.requestDescription}
					</h1>
					<h2 className="font-bold text-lg text-white">
						{request.creatorUsername}
					</h2>
				</div>
				<div className="flex flex-row items-center w-full justify-between md:hidden">
					<div className="request-location-text w-2/5">
						<h1 className="font-bold text-lg text-white overflow-hidden text-ellipsis whitespace-nowrap">
							{request.location}
						</h1>
					</div>
					<div className="w-2/5">
						<h2 className="font-bold text-lg text-white overflow-hidden text-ellipsis whitespace-nowrap">
							(
							{request.acceptorUsername
								? `Accepted by ${request.acceptorUsername}`
								: "Yet to be accepted"}
							)
						</h2>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
