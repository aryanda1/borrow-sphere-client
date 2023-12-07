import { useEffect, useState } from "react";
import useFetchCommunities from "../customHooksAndServices/fetchCommunities";
import {
	BackendCommunityData,
	FrontendUsableCommunityData,
	FrontendUsableCommunityDataWithDistance,
} from "../models/communityModels";
import CommunityItem from "./communityItem";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import { motion } from "framer-motion";

export default function JoinACommunity() {
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [Loading, setLoading] = useState<boolean>(false);
	const { fetchCommunities } = useFetchCommunities();
	const [communities, setCommunities] =
		useState<FrontendUsableCommunityData[]>();
	const [communitiesDistanceSorted, setCommunitiesDistanceSorted] =
		useState<FrontendUsableCommunityDataWithDistance[]>();

	useEffect(() => {
		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
				setLoading(false);
			},
			(err) => {
				setLoading(false);
				if (err.code === err.PERMISSION_DENIED) {
					alert(
						"Please enable location services. Reload the page and try again if you are not prompted to enable location services."
					);
				}
			}
		);
	}, []);

	useEffect(() => {
		if (communities) {
			return;
		}
		fetchCommunities()
			.then((response) => {
				const backendCommunitiesData: BackendCommunityData[] =
					response.data.communities;
				const frontendUsableCommunityData: FrontendUsableCommunityData[] =
					backendCommunitiesData.map((community) => {
						return {
							communityId: community.communityId,
							communityName: community.communityName,
							communityLatitude: community.communityLatitude,
							communityLongitude: community.communityLongitude,
							communityDescription: community.communityDescription,
						};
					});
				setCommunities(frontendUsableCommunityData);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	useEffect(() => {
		const deg2rad = (deg: number) => {
			return deg * (Math.PI / 180);
		};
		const getDistanceFromLatLonInKm = (
			lat1: number,
			lon1: number,
			lat2: number,
			lon2: number
		) => {
			const R = 6371;
			const dLat = deg2rad(lat2 - lat1);
			const dLon = deg2rad(lon2 - lon1);
			const a =
				Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(deg2rad(lat1)) *
					Math.cos(deg2rad(lat2)) *
					Math.sin(dLon / 2) *
					Math.sin(dLon / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			const d = R * c;
			return d;
		};
		if (communities && communities.length > 0 && latitude && longitude) {
			const communitiesWithDistance: FrontendUsableCommunityDataWithDistance[] =
				communities.map((community) => {
					const distance = getDistanceFromLatLonInKm(
						latitude,
						longitude,
						community.communityLatitude,
						community.communityLongitude
					);
					return {
						communityId: community.communityId,
						communityName: community.communityName,
						communityLatitude: community.communityLatitude,
						communityLongitude: community.communityLongitude,
						communityDescription: community.communityDescription,
						distance: distance,
					};
				});
			const sortedCommunities = communitiesWithDistance.sort(
				(a, b) => a.distance - b.distance
			);
			setCommunitiesDistanceSorted(sortedCommunities);
		}
	}, [communities, latitude, longitude]);

	if (Loading || !communities) {
		return (
			<div className="flex flex-col items-center font-bold text-5xl mt-20 mb-6 text-white text-center">
				<p>Loading communities...</p>
			</div>
		);
	}

	if (!latitude || !longitude) {
		return (
			<motion.div
				className="flex flex-col items-center"
				variants={PageTransitionVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600 text-center">
					Coordinates could not be retrieved.
				</h1>
				<p className="font-light text-3xl mb-10 text-fuchsia-200 text-center">
					Make sure you have location services enabled and try again later.
				</p>
			</motion.div>
		);
	}

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
					Available communites
				</h1>
				<p className="font-light text-3xl mb-10 text-fuchsia-200 text-center">
					(Sorted in increasing order of distance from your location)
				</p>
				<div className="flex flex-col items-center w-1/2 md:w-4/5">
					{communitiesDistanceSorted &&
						communitiesDistanceSorted.slice(0, 10).map((community, id) => {
							return <CommunityItem key={id} community={community} />;
						})}
				</div>
			</motion.div>
		</>
	);
}
