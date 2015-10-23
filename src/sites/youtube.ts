/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='./query-string.d.ts' />

import { parse, stringify } from 'query-string';
import * as url from 'url';

import { SiteInformation, EmbedUrlSite } from '../types';
import { startsWith } from '../utils';

function getQuery(si : SiteInformation) : any {
	return parse(url.parse(si.url).query);
}

function getEmbedUrl(si: SiteInformation) {
	var query = getQuery(si);
	var video = query['v'];
	
	if (!video && !query['list']) {
		throw Error("No video found!");
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

export default new EmbedUrlSite('YouTube', ['www.youtube.com'], getEmbedUrl, canOpen);