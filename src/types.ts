/// <reference path='../typings/tsd.d.ts' />

export interface SiteInformation {
	url : string,
	dom? : HTMLElement
};

export interface FsSite {
	name : string;
	domains: string[];
	canOpenFs : (site : SiteInformation, tab : chrome.tabs.Tab) => boolean;
	openFs : (site : SiteInformation, tab : chrome.tabs.Tab) => void;
};

export class EmbedUrlSite implements FsSite {
	name : string;
	domains : string[];
	canOpenFs : (site : SiteInformation, tab : chrome.tabs.Tab) => boolean;
	createEmbedUrl : (SiteInformation) => string;
	
	openFs (si : SiteInformation, tab: chrome.tabs.Tab) {
		var embedUrl = this.createEmbedUrl(si);
		
		chrome.tabs.update(tab.id, {url: embedUrl});
	};
	
	constructor(name : string, 
				domains : string[], 
				createEmbedUrl : (site : SiteInformation) => string, 
				canOpenFs : (site : SiteInformation, tab : chrome.tabs.Tab) => boolean) {
		this.name = name;
		this.domains = domains;
		this.createEmbedUrl = createEmbedUrl;
		this.canOpenFs = canOpenFs;
	}
};