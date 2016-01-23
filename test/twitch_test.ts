/// <reference path='../typings/tsd.d.ts' />
import chai = require('chai');
var expect = chai.expect;

import twitch from '../src/sites/twitch';

import * as embedUrlSite from './embedUrlSite';

function stringContains(test : string, part : string) : boolean {
	return test.indexOf(part) > -1;
};

describe('twitch', () => {	
	var Coft = embedUrlSite.CanOpenFsTest;
	embedUrlSite.test_CanOpenFs(twitch, [
		new Coft('with embed url', 'https://twitch.tv/dreamhacksc2/popout', false),
		new Coft('in normal stream', 'https://twitch.tv/zeroempires', true)
	]);
	
	var channel = 'zeroempires';
	var Ceut = embedUrlSite.CreateEmbedUrlTest; 
	embedUrlSite.test_CreateEmbedUrl(twitch, channel, 'popout', [
		new Ceut('with only simple video', `https://vimeo.com/${channel}`)
	]);
});