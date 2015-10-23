/// <reference path='../typings/tsd.d.ts' />
import chai = require('chai');
var expect = chai.expect;

import vimeo from '../src/sites/vimeo';

import * as embedUrlSite from './embedUrlSite';

function stringContains(test : string, part : string) : boolean {
	return test.indexOf(part) > -1;
};

describe('vimeo', () => {	
	var Coft = embedUrlSite.CanOpenFsTest;
	embedUrlSite.test_CanOpenFs(vimeo, [
		new Coft('with embed url', 'https://player.vimeo.com/video/143099296', false),
		new Coft('in channel', 'https://vimeo.com/channels/documentaryfilm', false),
		new Coft('in group video', 'https://vimeo.com/groups/stopmotion/videos/143347824', true),
		new Coft('in channel video', 'https://vimeo.com/channels/staffpicks/143075521', true),
		new Coft('in simple video', 'https://vimeo.com/143075521', true)
	]);
	
	var videoId = '143075521';
	var Ceut = embedUrlSite.CreateEmbedUrlTest; 
	embedUrlSite.test_CreateEmbedUrl(vimeo, videoId, 'player.', [
		new Ceut('with only simple video', `https://vimeo.com/${videoId}`), 
		new Ceut('with group video', `https://vimeo.com/groups/stopmotion/videos/${videoId}`)
	]);
});