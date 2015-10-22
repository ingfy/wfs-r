/// <reference path='../typings/tsd.d.ts' />

import * as types from './types';
import youtube from './sites/youtube';

let availableSites : types.FsSite[] = [
	youtube
];

let sites: { [id : string] : types.FsSite; }= {};

function extractDomain(url : string) : string {
	return url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
}

class SiteMatch {
	tab : chrome.tabs.Tab;
	site : types.FsSite;
	
	constructor(site : types.FsSite, tab : chrome.tabs.Tab) {
		this.site = site;
		this.tab = tab;
	}
	
	open() : void {
		this.site.openFs({url : this.tab.url}, this.tab);
	}
}

function findSite(tab : chrome.tabs.Tab) : SiteMatch {
	var tabDomain = extractDomain(tab.url);
	
	var siteSupports = (site: types.FsSite) => 
		site.domains.filter(domain => domain == tabDomain).length > 0 &&
		site.canOpenFs({url: tab.url}, tab);
	
	let matches = availableSites.filter(siteSupports);
	
	return matches.length > 0 ? new SiteMatch(matches[0], tab) : null;
};

chrome.tabs.onUpdated.addListener((tabId, __, tab) => {
	var site = findSite(tab);
	
	if (site == null) return chrome.pageAction.hide(tabId);
	
	chrome.pageAction.show(tabId);
});

chrome.pageAction.onClicked.addListener((tab) => {
	findSite(tab).open();
});