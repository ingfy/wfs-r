/// <reference path='../typings/tsd.d.ts' />

import {VideoInfo} from './videoInfo';

export interface ContentScript {
	getVideoInfo? : (HTMLelement) => VideoInfo;
}

export function initialize(script : ContentScript) : void {
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.getVideoInfo && script.getVideoInfo) {
            return sendResponse({videoInfo: script.getVideoInfo(document)})
        } 
        
		return sendResponse({});
	});
}