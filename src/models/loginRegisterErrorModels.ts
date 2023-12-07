export interface LoginErrors {
	loginPasswordError: boolean;
	loginEmailError: boolean;
}

export interface RegistrationErrors {
	registerUsername: boolean;
	registerPassword: boolean;
	registerPhoneNumber: boolean;
	passwordMatch: boolean;
	registerEmail: boolean;
}

export interface RegisterErrorAction {
	type:
		| "resetAllErrors"
		| "setRegisterUsernameError"
		| "setRegisterPasswordError"
		| "setPasswordMatchError"
		| "setRegisterPhoneNumberError"
		| "setRegisterEmailError";
}
