import { useEffect, useState } from "react";
import useFetchCommunityRequests from "../customHooksAndServices/fetchCommunityRequests";
import {
	RawBackendRequestData,
	FrontendUsableRequestData,
} from "../models/requestModels";
import RequestItem from "./requestItem";
import useAuth from "../customHooksAndServices/authContextHook";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import ListContainerTransitionVariants from "../framerMotionVariants/listContainerTransitionVariants";
import { motion } from "framer-motion";

export default function RequestHistory() {
	const { user } = useAuth();
	const { fetchRequests } = useFetchCommunityRequests();
	const [
		allInactiveRequestsPertainingToUser,
		setAllInactiveRequestsPertainingToUser,
	] = useState<FrontendUsableRequestData[]>();
	const [inactiveRequestsCreatedByUser, setInactiveRequestsCreatedByUser] =
		useState<FrontendUsableRequestData[]>();
	const [inactiveRequestsAcceptedByUser, setInactiveRequestsAcceptedByUser] =
		useState<FrontendUsableRequestData[]>();
	const [requestsToBeDisplayed, setRequestsToBeDisplayed] =
		useState<FrontendUsableRequestData[]>();

	useEffect(() => {
		if (requestsToBeDisplayed) {
			return;
		}
		fetchRequests()
			.then((data) => {
				const rawRequestArray: RawBackendRequestData[] = data.data;
				const requestArray: FrontendUsableRequestData[] = rawRequestArray.map(
					(request) => {
						return {
							_id: request._id,
							createdAt: request.createdAt,
							creatorUsername: request.creatorUsername,
							acceptorUsername: request.acceptorUsername,
							requestDescription: request.requestDescription,
							location: request.location,
							requestLatitude: request.requestLatitude,
							requestLongitude: request.requestLongitude,
							community: request.community,
							completed: request.completed,
							cancelled: request.cancelled,
						};
					}
				);
				const inactiveRequests = requestArray.filter(
					(request) => request.completed || request.cancelled
				);
				const inactiveRequestsPertainingToUser = inactiveRequests.filter(
					(request) =>
						request.creatorUsername === user.username ||
						request.acceptorUsername === user.username
				);
				const inactiveRequestsCreatedByUser =
					inactiveRequestsPertainingToUser.filter(
						(request) => request.creatorUsername === user.username
					);
				const inactiveRequestsAcceptedByUser =
					inactiveRequestsPertainingToUser.filter(
						(request) => request.acceptorUsername === user.username
					);
				setAllInactiveRequestsPertainingToUser(
					inactiveRequestsPertainingToUser
				);
				setInactiveRequestsCreatedByUser(inactiveRequestsCreatedByUser);
				setInactiveRequestsAcceptedByUser(inactiveRequestsAcceptedByUser);
				setRequestsToBeDisplayed(allInactiveRequestsPertainingToUser);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	return (
		<>
			{!requestsToBeDisplayed && (
				<motion.div
					className="flex flex-col items-center font-bold text-5xl mt-20 mb-6 text-white text-center"
					variants={PageTransitionVariants}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					<p>Loading requests...</p>
				</motion.div>
			)}
			{requestsToBeDisplayed && (
				<motion.div
					className="flex flex-col items-center"
					variants={ListContainerTransitionVariants}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600 text-center">
						Request history
					</h1>
					<select
						className="w-1/2 mb-6 bg-transparent p-4 text-2xl text-white md:w-4/5"
						onChange={(e) => {
							if (e.target.value === "all") {
								setRequestsToBeDisplayed(allInactiveRequestsPertainingToUser);
							} else if (e.target.value === "created") {
								setRequestsToBeDisplayed(inactiveRequestsCreatedByUser);
							} else if (e.target.value === "accepted") {
								setRequestsToBeDisplayed(inactiveRequestsAcceptedByUser);
							}
						}}
					>
						<option value="all">All</option>
						<option value="created">Requests I created</option>
						<option value="accepted">Requests I accepted</option>
					</select>
					{requestsToBeDisplayed.length > 0 && (
						<div className="flex flex-col items-center w-full md:w-full">
							{requestsToBeDisplayed.map((request, ind) => {
								return <RequestItem key={ind} request={request} />;
							})}
						</div>
					)}
					{requestsToBeDisplayed.length === 0 && (
						<h2 className="font-bold text-2xl mt-20 text-white">
							No matching requests
						</h2>
					)}
				</motion.div>
			)}
		</>
	);
}
