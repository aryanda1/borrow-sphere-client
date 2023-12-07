const PageTransitionVariants = {
	initial: {
		opacity: 0,
		x: 100,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.05,
			type: "linear",
			duration: 0.3,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		x: -100,
		transition: {
			type: "linear",
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

export default PageTransitionVariants;
