import useAuth from "../customHooksAndServices/authContextHook";
import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function CommunityRequiredRoutes() {
	const { user } = useAuth();
	const { community } = user;
	const location = useLocation();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (!community) {
			navigateTo("/not-in-community", {
				state: { from: location },
				replace: true,
			});
		}
	}, [navigateTo, location, community]);

	return <Outlet />;
}
