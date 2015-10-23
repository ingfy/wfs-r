/// <reference path='../typings/tsd.d.ts' />
import chai = require('chai');
var expect = chai.expect;

import vimeo from '../src/sites/vimeo';

function stringContains(test : string, part : string) : boolean {
	return test.indexOf(part) > -1;
};

describe('vimeo', () => {
	describe('#canOpenFs', () => {
		var result : boolean;
		
		describe('with emed url', () => {
			beforeEach(() => {
				var si = { url : 'https://player.vimeo.com/video/143099296' };
				
				result = vimeo.canOpenFs(si, null);
			});
			
			it('should return false', () => {
				expect(result).to.be.false;
			});
		});
		
		describe('in channel', () => {
			beforeEach(() => {
				var si = { url : 'https://vimeo.com/channels/documentaryfilm' };
				
				result = vimeo.canOpenFs(si, null);
			});
			
			it('should return false', () => {
				expect(result).to.be.false;
			});
		});
		
		describe('in group video', () => {
			beforeEach(() => {
				var si = { url : 'https://vimeo.com/groups/stopmotion/videos/143347824' };
				
				result = vimeo.canOpenFs(si, null);
			});
			
			it('should return false', () => {
				expect(result).to.be.true;
			});
		});
		
		describe('in channel video', () => {
			beforeEach(() => {
				var si = { url : 'https://vimeo.com/channels/staffpicks/143075521' };
				
				result = vimeo.canOpenFs(si, null);
			});
			
			it('should return true', () => {
				expect(result).to.be.true;
			});
		});
		
		describe('in simple video', () => {
			beforeEach(() => {
				var si = { url : 'https://vimeo.com/143075521' };
				
				result = vimeo.canOpenFs(si, null);
			});
			
			it('should return true', () => {
				expect(result).to.be.true;
			});
		});
	});
	
	describe('#createEmbedUrl', () => {
		var result: string;
		var id = '143075521';
		
		class Video {
			description; url;
			constructor(description : string, url : string) {
				this.description = description;
				this.url = url;
			}
		}
		
		let videos = [
			new Video('with only simple video', `https://vimeo.com/${id}`), 
			new Video('with group video', `https://vimeo.com/groups/stopmotion/videos/${id}`)
		];
		
		videos.forEach((video) => {
			describe(video.description, () => {
				beforeEach(() => {
					var si = { url: video.url };
				
					result = vimeo.createEmbedUrl(si);
				});
				
				it('should contain player.', () => {
					expect(result).to.contain('player.');
				});
				
				it('should contain the video ID', () => {
					expect(result).to.contain(id);
				});
			});
		});
	});
});