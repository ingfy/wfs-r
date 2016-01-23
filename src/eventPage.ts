/// <reference path='../typings/tsd.d.ts' />

import * as url from 'url';

import * as types from './types';
import {VideoInfo} from './videoInfo';

import youtube from './sites/youtube';
import vimeo from './sites/vimeo';
import twitch from './sites/twitch';

let availableSites : types.FsSite[] = [
	youtube,
	vimeo,
    twitch
];

let sites: { [id : string] : types.FsSite; }= {};

class SiteMatch {
	tab : chrome.tabs.Tab;
	site : types.FsSite;
	
	constructor(site : types.FsSite, tab : chrome.tabs.Tab) {
		this.site = site;
		this.tab = tab;
	}
	
	si(videoInfo? : VideoInfo) {
		let si : types.SiteInformation = {url : this.tab.url};
		
		if (videoInfo) si.video = videoInfo;
		
		return si;
	}
	
	open() : void {
		chrome.tabs.sendMessage(this.tab.id, {getVideoInfo: true}, (response) => {
			this.site.openFs(this.si(response && response.videoInfo), this.tab);	// TODO: what to do for sites without content scripts?
		});
	}
}

function findSite(tab : chrome.tabs.Tab) : SiteMatch {
	let tabDomain = url.parse(tab.url).host;
	
	let siteSupports = (site: types.FsSite) => 
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