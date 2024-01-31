import { RegistrationErrors } from "../models/loginRegisterErrorModels";
import "../index.css";

export default function RegisterErrorComponent(props: {
	registerErrors: RegistrationErrors;
}): JSX.Element {
	const { registerErrors } = props;
	return (
		<>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div w-4/5 ${
					registerErrors.registerEmail ? "visible" : ""
				}`}
			>
				<p className="text-white text-center">
					Invalid email.
					<br />
					Please enter a valid email address.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div w-4/5 
								${registerErrors.registerUsername ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid username.
					<br />
					Must be 4-24 characters long, contain only letters, numbers, and
					underscores, and start with a letter.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div w-4/5 
								${registerErrors.registerPassword ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid password.
					<br />
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div w-4/5 
								${registerErrors.passwordMatch ? "visible" : ""}`}
			>
				<p className="text-white text-center">Passwords do not match.</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div w-4/5
								${registerErrors.registerPhoneNumber ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid phone number.
					<br />
					Must be 10 digits long and contain only numbers.
				</p>
			</div>
		</>
	);
}
