import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";

export default function CommunityCreatedSuccessfully() {
	return (
		<motion.div
			className="flex flex-col items-center"
			variants={PageTransitionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600 text-center">
				Community created successfully
			</h1>
			<Link to="/dashboard">
				<button className="border-2 border-white hover:bg-white hover:text-fuchsia-700 hover:-translate-x-1 hover:-translate-y-1 text-white font-bold py-2 px-4 transition-all rounded-3xl">
					Back to dashboard
				</button>
			</Link>
		</motion.div>
	);
}
