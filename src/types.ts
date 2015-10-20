/// <reference path='../typings/tsd.d.ts' />

export interface SiteInformation {
	url : string,
	dom? : HTMLElement
};

export interface FsSite {
	name : string;
	domains: string[];
	openFs : (SiteInformation) => void;
};

export class EmbedUrlSite implements FsSite {
	name : string;
	domains : string[];
	createEmbedUrl : (SiteInformation) => string;
	openFs (si : SiteInformation) {
		var embedUrl = this.createEmbedUrl(si);
		
		chrome.tabs.getCurrent((tab) => {
			chrome.tabs.update(tab.id, {url: embedUrl});
		});
	};
	
	constructor(name : string, domains : string[], createEmbedUrl : (si : SiteInformation) => string) {
		this.name = name;
		this.domains = domains;
		this.createEmbedUrl = createEmbedUrl;
	}
};