export interface EditProfileErrors {
	editPassword: boolean;
	editPhoneNumber: boolean;
	editEmail: boolean;
}

export interface EditProfileErrorAction {
	type:
		| "resetAllErrors"
		| "setEditPasswordError"
		| "setEditEmailError"
		| "setEditPhoneNumberError";
}

export enum EditProperties {
	email = "email",
	password = "password",
	firstName = "firstName",
	lastName = "lastName",
	phoneNumber = "phoneNumber",
}
