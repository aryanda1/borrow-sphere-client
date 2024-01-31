import { Link } from "react-router-dom";
import LandingPageTransitionVariants from "../framerMotionVariants/landingPageTransitionVariants";
import { motion } from "framer-motion";
import "../index.css";
import ListItemTransitionVariants from "../framerMotionVariants/listItemTransitionVariants";
import LandingPageFootballVariants from "../framerMotionVariants/landingPageFootballVariants";
import LandingPageChargerVariants from "../framerMotionVariants/landingPageChargerVariants";
import { useEffect } from "react";

export default function LandingPageComponent() {
	useEffect(() => {
		document.body.style.overflow = "hidden"; // Prevents scrolling on the landing page, caused by the SVGs being off screen
		let rootHtml = document.querySelector("html");
		rootHtml!.style.overflow = "hidden"; // Prevents scrolling on the landing page, caused by the SVGs being off screen
		rootHtml!.style.position = "fixed";
		rootHtml!.style.width = "100vw";
		return () => {
			document.body.style.overflow = "unset"; // Resets overflow property to allow scrolling once the user leaves the landing page\
			rootHtml!.style.overflow = "unset"; // Resets overflow property to allow scrolling once the user leaves the landing page
			rootHtml!.style.position = "unset";
			rootHtml!.style.width = "unset";
		};
	});
	return (
		<>
			<motion.div
				className="flex flex-col items-start mdm:pl-4 md:items-center"
				variants={LandingPageTransitionVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<motion.h1
					className="font-bold text-5xl mt-20 mb-6 z-10 text-fuchsia-600"
					variants={ListItemTransitionVariants}
				>
					Quick lend
				</motion.h1>
				<motion.p
					className="font-light text-3xl mb-10 z-10 text-fuchsia-200 md:text-center"
					variants={ListItemTransitionVariants}
				>
					Quickly borrow/lend general utilities within a localized community!
				</motion.p>
				<motion.div
					className="flex flex-row md:justify-center items-center w-full"
					variants={ListItemTransitionVariants}
				>
					<Link to="/login" className="mr-4 z-10">
						<button className="text-fuchsia-200 font-bold text-2xl px-8 py-2 login-button z-10 rounded-3xl">
							Login
						</button>
					</Link>
					<Link to="/register" className=" z-10">
						<button className="text-fuchsia-200 font-bold text-2xl px-8 py-2 register-button rounded-3xl">
							Register
						</button>
					</Link>
				</motion.div>
				<motion.svg
					variants={LandingPageFootballVariants}
					className="landing-page-football fill-fuchsia-900 md:fill-fuchsia-900 pointer-events-none"
				>
					<g>
						<path d="M61.44,0c16.97,0,32.33,6.88,43.44,18c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44 c-11.12,11.12-26.48,18-43.44,18S29.11,116,18,104.88C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18 C29.11,6.88,44.47,0,61.44,0L61.44,0z M76.85,117.08L76.73,117l6.89-23.09L69.41,78.15L52.66,78L39.38,94.62l6.66,22.32l-0.15,0.1 c4.95,1.38,10.16,2.12,15.55,2.12C66.78,119.16,71.95,118.44,76.85,117.08L76.85,117.08z M12.22,91.61l24.34,0.12L49.28,75.8 l-5.26-16.12l-21.42-9.3L3.78,64.08C4.23,74.14,7.26,83.53,12.22,91.61L12.22,91.61z M16.77,24.88l7.4,22.14l19.98,8.68 l15.44-11.97V20.94L40.51,7.63c-7.52,2.93-14.28,7.39-19.89,13C19.27,21.98,17.98,23.4,16.77,24.88L16.77,24.88z M81.7,7.37 L63.3,20.77V43.7L77.8,54.91l20.81-8.92l7.18-21.49c-1.12-1.35-2.3-2.64-3.54-3.88C96.48,14.85,89.49,10.29,81.7,7.37L81.7,7.37z M119.09,64.36l-0.02,0.01L99.09,49.82l-19.81,8.49l-6.08,18.03l13.73,15.23c0.06,0.06,0.09,0.13,0.11,0.21l23.6-0.11 C115.56,83.65,118.59,74.34,119.09,64.36L119.09,64.36z" />
					</g>
				</motion.svg>
				<motion.svg
					className="landing-page-charger fill-fuchsia-900  md:fill-fuchsia-800 pointer-events-none"
					variants={LandingPageChargerVariants}
				>
					<path d="M17,45.7V73.34a20,20,0,0,0,40,0V45.8a29,29,0,0,1,57.93,0V68.6h5.36a2.59,2.59,0,0,1,2.58,2.58V98.41A2.59,2.59,0,0,1,120.3,101h-.52v9.53A3.79,3.79,0,0,1,116,114.3H104.91a3.77,3.77,0,0,1-2.59-1l-.08-.07a3.78,3.78,0,0,1-1.11-2.67V101h-.52A2.59,2.59,0,0,1,98,98.41V71.18a2.59,2.59,0,0,1,2.58-2.58H106V45.8a20,20,0,0,0-40,0V73.34a29,29,0,0,1-57.93,0V45.7H2.58A2.59,2.59,0,0,1,0,43.12V15.89a2.59,2.59,0,0,1,2.58-2.58H3.1V3.78A3.79,3.79,0,0,1,6.88,0H18a3.81,3.81,0,0,1,3.78,3.78v9.53h.52a2.59,2.59,0,0,1,2.58,2.58V43.12a2.59,2.59,0,0,1-2.58,2.58ZM117.38,101H103.53v9.53a1.38,1.38,0,0,0,.4,1l0,0a1.39,1.39,0,0,0,.94.37H116a1.38,1.38,0,0,0,1.38-1.39V101ZM5.5,13.31H19.35V3.78A1.38,1.38,0,0,0,18,2.39H6.88A1.38,1.38,0,0,0,5.5,3.78v9.53Z" />
				</motion.svg>
			</motion.div>
		</>
	);
}
