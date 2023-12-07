import "../componentSpecificStyles/sideMenuStyles.css";
import useLogout from "../customHooksAndServices/logoutHook";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../customHooksAndServices/authContextHook";
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

export default function SideMenu(props: {
	showMenu: boolean;
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
	const { showMenu, setShowMenu } = props;
	const { logout } = useLogout();
	const navigate = useNavigate();
	const { user, setUser } = useAuth();
	const { username } = user;
	const { pathname } = useLocation();

	useEffect(() => {
		if (showMenu) {
			document.body.style.overflow = "hidden"; // Prevents scrolling in the background when menu is open
		}
		if (!showMenu) {
			document.body.style.overflow = "auto";
		}
	}, [showMenu]);

	const handleLogout = () => {
		logout().then(() => {
			setUser({
				username: "",
				accessToken: "",
				firstName: "",
				lastName: "",
				phoneNumber: "",
				email: "",
				community: "",
			});
			navigate("/");
		});
	};
	return (
		<div
			className={`flex flex-col items-center side-menu pt-32 ${
				showMenu ? "side-menu-active" : ""
			}`}
		>
			{
				//Links are rendered as anchor tags in the DOM, hence the use of a tag as selector in the stylesheet
			}
			<Link to="edit-profile" onClick={() => setShowMenu(false)}>
				<button>Edit your profile</button>
			</Link>
			<Link to="request-history" onClick={() => setShowMenu(false)}>
				<button>View past requests</button>
			</Link>
			<Link to="join-community" onClick={() => setShowMenu(false)}>
				<button>Join a community</button>
			</Link>
			{username === "admin" && (
				<Link to="create-community" onClick={() => setShowMenu(false)}>
					<button>Create a community</button>
				</Link>
			)}
			{pathname !== "/dashboard" ? (
				<Link
					to="/dashboard"
					className="mt-auto"
					onClick={() => setShowMenu(false)}
				>
					<button>Back to dashboard</button>
				</Link>
			) : null}
			<button
				className={pathname === "/dashboard" ? "mt-auto" : ""}
				onClick={() => {
					handleLogout();
					setShowMenu(false);
				}}
			>
				Log out
			</button>
		</div>
	);
}
