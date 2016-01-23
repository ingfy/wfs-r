/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='../query-string.d.ts' />

import * as url from 'url';
import { stringify } from 'query-string';

import { SiteInformation, EmbedUrlSite } from '../types';
import { startsWith, endsWith } from '../utils'; 

function isFs(si : SiteInformation) {
	return endsWith(url.parse(si.url).path, '/popout');
}

function canOpenFs(si : SiteInformation) {
	return !isFs(si) && extractChannelInfo(url.parse(si.url).path) != null;
}

let videoIdPattern = /^\/(\w+)\/?/;

function extractChannelInfo(path : string) : string {
	var match = videoIdPattern.exec(path);
	
	if (match && match[1]) return match[1];
	
	return null;
}


function getEmbedUrl(si : SiteInformation) {
	let parsed = url.parse(si.url);
    
    let channel = extractChannelInfo(parsed.path);
    
    
	
	return `https://www.twitch.tv/${channel}/popout?${stringify(parsed.query)}`;
}

export default new EmbedUrlSite('Twitch', ['twitch.tv', 'www.twitch.tv'], getEmbedUrl, canOpenFs);