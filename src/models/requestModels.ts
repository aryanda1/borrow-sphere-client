export interface RequestCreationData {
	requestDescription: string;
	location: string;
	requestLatitude: number | null;
	requestLongitude: number | null;
	community: string;
}

export interface RawBackendRequestData {
	__v: number;
	_id: string;
	acceptorUsername: string | null;
	cancelled: boolean;
	community: string;
	completed: boolean;
	createdAt: string;
	creatorUsername: string;
	location: string;
	requestDescription: string;
	requestLatitude: number | null;
	requestLongitude: number | null;
	updatedAt: string;
}

export interface FrontendUsableRequestData {
	_id: string;
	acceptorUsername: string | null;
	cancelled: boolean;
	community: string;
	completed: boolean;
	createdAt: string;
	creatorUsername: string;
	location: string;
	requestDescription: string;
	requestLatitude: number | null;
	requestLongitude: number | null;
}

export interface RequestDetails {
	_id: string;
	acceptorUsername: string | null;
	cancelled: boolean;
	community: string;
	completed: boolean;
	createdAt: string;
	creatorUsername: string;
	location: string;
	requestDescription: string;
	requestLatitude: number | null;
	requestLongitude: number | null;
	contactNumber: string | null;
}
