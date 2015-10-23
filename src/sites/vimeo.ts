/// <reference path='../../typings/tsd.d.ts' />

import * as url from 'url';

import { SiteInformation, EmbedUrlSite } from '../types';
import { startsWith } from '../utils'; 

function isFs(si : SiteInformation) {
	return startsWith(url.parse(si.url).host, 'player.');
}

function canOpenFs(si : SiteInformation) {
	return !isFs(si) && extractVideoIdFromSi(si) != null;
}

var videoIdPattern = /^\/(channels\/([^\/]+)\/|groups\/([^\/]+)\/videos\/)?(\d+)$/;

function extractVideoIdFromSi(si : SiteInformation) : number {
	return extractVideoId(url.parse(si.url).path);
}

function extractVideoId(path : string) : number {
	var match = videoIdPattern.exec(path);
	
	if (match && match[4]) return ~~match[4];
	
	return null;
}


function getEmbedUrl(si : SiteInformation) {
	var id = extractVideoIdFromSi(si);
	
	return `https://player.vimeo.com/video/${id}`;
}

export default new EmbedUrlSite('Vimeo', ['vimeo.com'], getEmbedUrl, canOpenFs);