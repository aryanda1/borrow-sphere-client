import useAuth from "../customHooksAndServices/authContextHook";
import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function AdminRequiredRoutes() {
	const { user } = useAuth();
	const username = user.username;
	const location = useLocation();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (username !== "admin") {
			navigateTo("/dashboard", {
				state: { from: location },
				replace: true,
			});
		}
	}, [navigateTo, location, username]);

	return <Outlet />;
}
