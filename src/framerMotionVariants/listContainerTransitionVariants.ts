const ListContainerTransitionVariants = {
	initial: {
		opacity: 0,
		x: 100,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			type: "linear",
			duration: 0.3,
			ease: "easeOut",
			delayChildren: 0.3,
			staggerChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		x: -100,
		transition: {
			delay: 0.5,
			delayChildren: 0.1,
			staggerChildren: 0.1,
			type: "linear",
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

export default ListContainerTransitionVariants;
