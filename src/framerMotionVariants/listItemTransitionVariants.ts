const ListItemTransitionVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			type: "linear",
			duration: 0.4,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: 100,
		transition: {
			type: "linear",
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

export default ListItemTransitionVariants;
