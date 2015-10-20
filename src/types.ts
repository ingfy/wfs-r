export interface SiteInformation {
	url : string,
	dom : HTMLElement
};

export interface FsSite {
	name : string;
	domains: string[];
	openFs : (SiteInformation) => void;
};