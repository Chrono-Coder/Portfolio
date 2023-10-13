export type Inputs = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

interface DerivedImage {
	asset: {
		url: string;
	};
}
interface SanityBody {
	_createdAt: string;
	_id: string;
	_rev: string;
	_updatedAt: string;
}

interface SanityImage {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
}

export interface SocialMedia extends SanityBody {
	_type: 'socialMedia';
	title: string;
	url: string;
}

export interface Project extends SanityBody {
	_type: 'project';
	title: string;
	summary: string;
	image: SanityImage;
	technologies: Technology[];
	linkToBuild: 'string';
}

export interface PageInfo extends SanityBody {
	_type: 'pageInfo';
	address: string;
	email: string;
	role: string;
	backgroundInformation: string;
	title: string;
	phoneNumber: string;
	profileImage: DerivedImage;
	heroImage: DerivedImage;
}

export interface Technology extends SanityBody {
	_type: 'skill';
	image: SanityImage;
	title: string;
	proficiency: number;
}

export interface Experience extends SanityBody {
	_type: 'experience';
	jobtitle: string;
	companyName: string;
	dateStarted: string;
	companyLogo: SanityImage;
	dateEnded: string;
	isCurrentlyWorkingThere: boolean;
	technologies: Technology[];
	points: string[];
}
