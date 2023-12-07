import useAuth from "../customHooksAndServices/authContextHook";
import "../componentSpecificStyles/dashboardStyles.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";

export default function DashboardComponent() {
	const { user } = useAuth();

	const community = user.community;
	return (
		<motion.div
			className="flex flex-col items-center"
			variants={PageTransitionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600 md:text-center">
				Hello {user.firstName}!
			</h1>
			<p className="font-light text-3xl mb-10 text-fuchsia-200 text-center">
				Welcome to your dashboard.
			</p>
			<div className="flex flex-row justify-center button-container md:flex-col md:items-center">
				<Link to={community ? "/active-requests" : "/not-in-community"}>
					<button>View active community requests</button>
				</Link>
				<Link to={community ? "/new-request" : "/not-in-community"}>
					<button className="mdm:ml-4 md:mt-4">Create a new request</button>
				</Link>
			</div>
		</motion.div>
	);
}
