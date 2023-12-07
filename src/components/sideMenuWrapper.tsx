import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../componentSpecificStyles/hamburgerStyles.css";
import SideMenu from "./sideMenu";

export default function SideMenuWrapper() {
	const [showMenu, setShowMenu] = useState(false);

	const [touchStart, setTouchStart] = useState<React.Touch | null>(null);
	const [touchEnd, setTouchEnd] = useState<React.Touch | null>(null);

	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0]);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0]);
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (!touchStart || !touchEnd) return;
		const horizontalDistance = touchStart.clientX - touchEnd.clientX;
		const isLeftSwipe = horizontalDistance > 150;
		const isRightSwipe = horizontalDistance < -150;

		const verticalDistance = touchStart.clientY - touchEnd.clientY;

		if (
			isLeftSwipe &&
			Math.abs(horizontalDistance) > Math.abs(verticalDistance)
		) {
			setShowMenu(false);
		}
		if (
			isRightSwipe &&
			Math.abs(horizontalDistance) > Math.abs(verticalDistance)
		) {
			setShowMenu(true);
		}
	};

	return (
		<>
			<div
				className="h-screen w-screen fixed overflow-scroll"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<button
					className={`hamburger-icon fa fa-check absolute ml-8 mt-8 md:ml-4 md:mt-5 self-start text-white text-4xl ${
						showMenu ? "menu-active" : ""
					}`}
					onClick={() => setShowMenu(!showMenu)}
				>
					<span className="bar-1"></span>
					<span className="bar-2"></span>
					<span className="bar-3"></span>
				</button>
				<SideMenu showMenu={showMenu} setShowMenu={setShowMenu} />
				<Outlet />
			</div>
		</>
	);
}
