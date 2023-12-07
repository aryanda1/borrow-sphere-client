import { Link } from "react-router-dom";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import { motion } from "framer-motion";

export default function CommunityJoinedSuccessfully() {
	return (
		<motion.div
			className="flex flex-col items-center"
			variants={PageTransitionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600 text-center">
				Community joined successfully
			</h1>
			<Link to="/dashboard">
				<button className="hover:bg-white hover:text-fuchsia-700 text-white font-bold p-4 transition-colors mt-8 border-2 rounded-3xl">
					Back to dashboard
				</button>
			</Link>
		</motion.div>
	);
}
