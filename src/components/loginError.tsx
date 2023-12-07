import "../index.css";
import { LoginErrors } from "../models/loginRegisterErrorModels";

export default function LoginErrorComponent(props: LoginErrors): JSX.Element {
	const { loginPasswordError, loginEmailError } = props;
	return (
		<>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div w-4/5 
			${loginEmailError ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid email.
					<br />
					Please enter a valid email address.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div w-4/5 
      ${loginPasswordError ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid password.
					<br />
					Must be 8-24 characters long, contain at least one uppercase letter,
					one lowercase letter, one number, and one special character.
				</p>
			</div>
		</>
	);
}
