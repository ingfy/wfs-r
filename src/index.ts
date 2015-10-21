/// <reference path='../typings/tsd.d.ts' />

import * as types from './types';
import youtube from './sites/youtube';
import * as _ from 'lodash';

let availableSites : types.FsSite[] = [
	youtube
];

let sites: { [id : string] : types.FsSite; }= {};

function domain(url : string) : string {
	return url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
}

function findSite(tab : chrome.tabs.Tab) : types.FsSite {
	var siteSupports = (site: types.FsSite) => _.contains(site.domains, domain(tab.url));
	
	return _.find(availableSites, siteSupports);
};

chrome.tabs.onUpdated.addListener((tabId, __, tab) => {
	var site = findSite(tab);
	
	if (site == null) return chrome.pageAction.hide(tabId);
	
	chrome.pageAction.show(tabId);
});

chrome.pageAction.onClicked.addListener((tab) => {
	alert("You're on " + findSite(tab) + "!");
});