import { useEffect, useState, useReducer } from "react";
import useRegister from "../customHooksAndServices/registrationHook";
import {
	RegistrationErrors,
	RegisterErrorAction,
} from "../models/loginRegisterErrorModels";
import RegisterErrorComponent from "./registerError";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../customHooksAndServices/authContextHook";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import ListItemTransitionVariants from "../framerMotionVariants/listItemTransitionVariants";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;

const initialErrorState = {
	registerUsername: false,
	registerPassword: false,
	passwordMatch: false,
	registerPhoneNumber: false,
	registerEmail: false,
};

const errorReducer = (
	state: RegistrationErrors,
	action: RegisterErrorAction
): RegistrationErrors => {
	switch (action.type) {
		case "resetAllErrors":
			state.registerUsername = false;
			state.registerPassword = false;
			state.passwordMatch = false;
			state.registerPhoneNumber = false;
			state.registerEmail = false;
			return { ...state };
		case "setRegisterUsernameError":
			state.registerUsername = true;
			return { ...state };
		case "setRegisterPasswordError":
			state.registerPassword = true;
			return { ...state };
		case "setPasswordMatchError":
			state.passwordMatch = true;
			return { ...state };
		case "setRegisterPhoneNumberError":
			state.registerPhoneNumber = true;
			return { ...state };
		case "setRegisterEmailError":
			state.registerEmail = true;
			return { ...state };
		default:
			return state;
	}
};

export default function RegisterComponent() {
	const { setUser } = useAuth();
	const { register } = useRegister();

	const [errorState, dispatchError] = useReducer(
		errorReducer,
		initialErrorState
	);

	const [requestInProgress, setRequestInProgress] = useState(false);

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
	const [registerFirstName, setRegisterFirstName] = useState("");
	const [registerLastName, setRegisterLastName] = useState("");
	const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");

	useEffect(() => {
		dispatchError({
			type: "resetAllErrors",
		});
		let validRegisterEmail = EMAIL_REGEX.test(registerEmail);
		if (!validRegisterEmail && registerEmail.length > 0) {
			dispatchError({
				type: "setRegisterEmailError",
			});
		}
		let validRegisterUsername = USER_REGEX.test(registerUsername);
		if (!validRegisterUsername && registerUsername.length > 0) {
			dispatchError({
				type: "setRegisterUsernameError",
			});
		}
		let validRegisterPassword = PWD_REGEX.test(registerPassword);
		if (!validRegisterPassword && registerPassword.length > 0) {
			dispatchError({
				type: "setRegisterPasswordError",
			});
		}
		let validPasswordMatch = registerPassword === registerConfirmPassword;
		if (!validPasswordMatch && validRegisterPassword) {
			dispatchError({
				type: "setPasswordMatchError",
			});
		}
		let validRegisterPhoneNumber = PHONE_REGEX.test(registerPhoneNumber);
		if (!validRegisterPhoneNumber && registerPhoneNumber.length > 0) {
			dispatchError({
				type: "setRegisterPhoneNumberError",
			});
		}
	}, [
		registerEmail,
		registerUsername,
		registerPassword,
		registerConfirmPassword,
		registerPhoneNumber,
	]);

	const navigateTo = useNavigate();

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			errorState.registerUsername ||
			errorState.registerPassword ||
			errorState.passwordMatch
		) {
			return;
		}
		setRequestInProgress(true);
		const data = await register({
			registerEmail,
			registerUsername,
			registerPassword,
			registerFirstName,
			registerLastName,
			registerPhoneNumber,
		});

		setRequestInProgress(false);
		if (data.status === 201) {
			setUser(data.data.user);
			navigateTo("/dashboard");
		} else {
			window.alert(data.response.data);
		}
	};

	return (
		<>
			<Link
				to="/"
				className="text-fuchsia-200 back-to-landing-page-button absolute ml-4 mt-4 rounded-3xl"
			>
				<FaArrowLeft className="mdm:hidden" />
				<span className="md:hidden">Back to the Landing Page</span>
			</Link>
			<main className="flex flex-col justify-center items-center w-full register-page">
				<motion.div
					className="wrapper flex flex-row justify-center items-start w-full"
					variants={PageTransitionVariants}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					<div className="flex flex-col justify-center items-center w-3/5 md:w-full">
						<h1 className="font-thin text-2xl text-fuchsia-200 mb-3 mt-8">
							REGISTER
						</h1>
						<form
							className=" w-full register-details-grid register-form md:w-4/5"
							onSubmit={handleRegister}
						>
							<div className="grid grid-cols-4 md:grid-cols-1">
								<motion.label
									variants={ListItemTransitionVariants}
									htmlFor="register-email"
								>
									Email
								</motion.label>
								<motion.input
									variants={ListItemTransitionVariants}
									type="email"
									name="email"
									id="register-email"
									value={registerEmail}
									autoComplete="off"
									onChange={(e) => setRegisterEmail(e.target.value)}
									required
								/>
								<motion.label
									variants={ListItemTransitionVariants}
									htmlFor="username"
								>
									Username
								</motion.label>
								<motion.input
									variants={ListItemTransitionVariants}
									type="text"
									name="username"
									id="username"
									value={registerUsername}
									autoComplete="off"
									onChange={(e) => setRegisterUsername(e.target.value)}
									required
								/>
								<motion.label
									variants={ListItemTransitionVariants}
									htmlFor="register-password"
								>
									Password
								</motion.label>
								<motion.input
									variants={ListItemTransitionVariants}
									type="password"
									name="password"
									id="register-password"
									value={registerPassword}
									autoComplete="off"
									onChange={(e) => setRegisterPassword(e.target.value)}
									required
								/>
								<motion.label
									variants={ListItemTransitionVariants}
									htmlFor="register-confirmPassword"
								>
									Confirm Password
								</motion.label>
								<motion.input
									variants={ListItemTransitionVariants}
									type="password"
									name="confirmPassword"
									id="register-confirmPassword"
									value={registerConfirmPassword}
									autoComplete="off"
									onChange={(e) => setRegisterConfirmPassword(e.target.value)}
									required
								/>
								<motion.label
									variants={ListItemTransitionVariants}
									htmlFor="firstName"
								>
									First Name
								</motion.label>
								<motion.input
									variants={ListItemTransitionVariants}
									type="text"
									name="firstName"
									id="firstName"
									value={registerFirstName}
									onChange={(e) => setRegisterFirstName(e.target.value)}
									required
								/>
								<motion.label
									variants={ListItemTransitionVariants}
									htmlFor="lastName"
								>
									Last Name
								</motion.label>
								<motion.input
									variants={ListItemTransitionVariants}
									type="text"
									name="lastName"
									id="lastName"
									value={registerLastName}
									onChange={(e) => setRegisterLastName(e.target.value)}
									required
								/>
								<motion.label
									variants={ListItemTransitionVariants}
									htmlFor="phoneNumber"
								>
									Phone Number
								</motion.label>
								<motion.input
									variants={ListItemTransitionVariants}
									type="tel"
									name="phoneNumber"
									id="phoneNumber"
									value={registerPhoneNumber}
									onChange={(e) => setRegisterPhoneNumber(e.target.value)}
									required
								/>
							</div>
							<motion.div
								variants={ListItemTransitionVariants}
								className="flex flex-col items-center"
							>
								<button
									type="submit"
									className="register-button md:scale-125 md:mt-8 md:mb-8 rounded-3xl"
									disabled={
										requestInProgress ||
										errorState.passwordMatch ||
										errorState.registerPassword ||
										errorState.registerUsername ||
										errorState.registerPhoneNumber
									}
								>
									Register
								</button>
								<Link
									to="/login"
									className="register-login-link text-white mt-4 mb-8"
								>
									Already have an account? Login
								</Link>
							</motion.div>
						</form>
						<RegisterErrorComponent registerErrors={errorState} />
					</div>
				</motion.div>
			</main>
		</>
	);
}
