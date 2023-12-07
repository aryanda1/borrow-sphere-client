export interface Community {
	id: string;
	name: string;
	description: string;
	latitude: number;
	longitude: number;
}

export interface BackendCommunityData {
	__v: number;
	_id: string;
	communityDescription: string;
	communityId: string;
	communityLatitude: number;
	communityLongitude: number;
	communityName: string;
	createdAt: string;
	updatedAt: string;
}

export interface FrontendUsableCommunityData {
	communityDescription: string;
	communityId: string;
	communityLatitude: number;
	communityLongitude: number;
	communityName: string;
}

export interface FrontendUsableCommunityDataWithDistance
	extends FrontendUsableCommunityData {
	distance: number;
}
