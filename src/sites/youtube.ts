/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='../query-string.d.ts' />
/// <reference path='../domains.d.ts' />

import { parse, stringify } from 'query-string';
import * as url from 'url';

import { SiteInformation, EmbedUrlSite } from '../types';
import { startsWith } from '../utils';

let domains = require('../domains');

function getQuery(si : SiteInformation) : any {
	return parse(url.parse(si.url).query);
}

function getEmbedUrl(si: SiteInformation) {
	let query = getQuery(si);
	let video = query['v'];

	if (!video && !query['list']) {
		throw Error("No video found!");
	}

	if (si.video) {		
		let timestamp = si.video.currentTime;
		
		query['start'] = Math.floor(timestamp);
	}
	
	delete query['v'];

	return `https://www.youtube.com/embed/${video}?${stringify(query)}`;
}

function isOpen(si : SiteInformation) : boolean {
	return startsWith(url.parse(si.url).pathname, '/embed/');
}

function canOpen(si : SiteInformation) : boolean {
	return !isOpen(si) && !!getQuery(si)['v'];
};

export default new EmbedUrlSite('YouTube', [domains.sites.youtube], getEmbedUrl, canOpen);
