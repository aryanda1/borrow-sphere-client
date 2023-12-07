const LandingPageChargerVariants = {
	initial: {
		opacity: 0,
		y: -100,
		x: 100,
		scale: 2.5,
		rotate: "60deg",
	},
	animate: {
		opacity: 1,
		y: 0,
		x: 0,
		scale: 2.5,
		rotate: "60deg",
		transition: {
			type: "linear",
			duration: 0.5,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: -100,
		transition: {
			type: "linear",
			duration: 0.4,
			ease: "easeOut",
		},
	},
};

export default LandingPageChargerVariants;
