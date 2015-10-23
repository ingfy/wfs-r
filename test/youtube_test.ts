/// <reference path='../typings/tsd.d.ts' />
import chai = require('chai');
var expect = chai.expect;

import youtube from '../src/sites/youtube';
import * as embedUrlSite from './embedUrlSite';

function stringContains(test : string, part : string) : boolean {
	return new RegExp("^.*" + part.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ".*$").test(test);
};

describe('youtube', () => {
	var Coft = embedUrlSite.CanOpenFsTest;
	embedUrlSite.test_CanOpenFs(youtube, [
		new Coft('with embed url', 'https://www.youtube.com/embed/I8yA7J2GMrE', false),
		new Coft('on channel page', 'https://www.youtube.com/channel/UCmX7sQ4uz_Jx45ztKGrWT-g', false),
		new Coft('in video', 'https://www.youtube.com/watch?v=aXkCsvLHVxs&list=PL5d1KNNFArSPvJVHgHqWHG6VPEiPANaNU', true)
	]);
	
	
	var videoId = 'I8yA7J2GMrE';
	var listId = 'abcdefg';
	var Ceut = embedUrlSite.CreateEmbedUrlTest; 
	embedUrlSite.test_CreateEmbedUrl(youtube, videoId, '/embed/', [
		new Ceut('with only simple video', `https://www.youtube.com/watch?v=${videoId}`), 
		new Ceut('with a playlist', `https://www.youtube.com/watch?v=${videoId}&list=${listId}`, `list=${listId}`)
	]);
});