import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import { motion } from "framer-motion";

export default function NotInACommunity() {
	return (
		<motion.div
			className="flex flex-col items-center"
			variants={PageTransitionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600 text-center">
				Join a Community
			</h1>
			<p className="font-light text-3xl mb-10 text-fuchsia-200 text-center">
				You are currently not part of a community.
				<br />
				Please join one from the side bar to access this feature.
			</p>
		</motion.div>
	);
}
