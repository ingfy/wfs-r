/// <reference path='../typings/tsd.d.ts' />
import chai = require('chai');
var expect = chai.expect;

import youtube from '../src/sites/youtube';

function stringContains(test : string, part : string) : boolean {
	return new RegExp("^.*" + part.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ".*$").test(test);
};

describe('youtube', () => {
	describe('#canOpenFs', () => {
		var result : boolean;
		
		describe('with emed url', () => {
			beforeEach(() => {
				var si = { url : "https://www.youtube.com/embed/I8yA7J2GMrE" };
				
				result = youtube.canOpenFs(si, null);
			});
			
			it('should return false', () => {
				expect(result).to.be.false;
			});
		});
		
		describe('in channel', () => {
			beforeEach(() => {
				var si = { url : "https://www.youtube.com/channel/UCmX7sQ4uz_Jx45ztKGrWT-g" };
				
				result = youtube.canOpenFs(si, null);
			});
			
			it('should return false', () => {
				expect(result).to.be.false;
			});
		});
		
		describe('in video', () => {
			beforeEach(() => {
				var si = { url : "https://www.youtube.com/watch?v=aXkCsvLHVxs&list=PL5d1KNNFArSPvJVHgHqWHG6VPEiPANaNU" };
				
				result = youtube.canOpenFs(si, null);
			});
			
			it('should return true', () => {
				expect(result).to.be.true;
			});
		});
	});
	
	describe('#createEmbedUrl', () => {
		var result: string;
		var id = 'I8yA7J2GMrE';
		
		describe('with only simple video', () => {
			beforeEach(() => {
				var si = { url: 'https://www.youtube.com/watch?v=' + id };
			
				result = youtube.createEmbedUrl(si);
			});
			
			it('should contain /embed/', () => {
				expect(result).to.contain('/embed/');
			});
			
			it('should contain the video ID', () => {
				expect(result).to.contain(id);
			});
		});
		
		describe('with a playlist', () => {
			var listId = 'abc';
			
			beforeEach(() => {
				var si = { url: 'https://www.youtube.com/watch?v=' + id + '&list=' + listId};	
			
				result = youtube.createEmbedUrl(si);
			});
			
			it('should keep lists', () => {
				expect(result).to.contain('list=' + listId);
			});
		});
	});
});