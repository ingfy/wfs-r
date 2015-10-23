/// <reference path='../typings/tsd.d.ts' />
import chai = require('chai');
var expect = chai.expect;

import { EmbedUrlSite } from '../src/types';

export class CanOpenFsTest {
	url : string;
	description : string;
	canOpen : boolean;
	
	constructor(description : string, url : string, canOpen: boolean) {
		this.url = url;
		this.description = description;
		this.canOpen = canOpen;
	}
}

export function test_CanOpenFs(site : EmbedUrlSite, tests : CanOpenFsTest[]) : void {
	describe('#canOpenFs', () => {
		var result : boolean;
		
		tests.forEach((test) => {
			describe(test.description, () => {
				beforeEach(() => {
					var si = { url : test.url };
					
					result = site.canOpenFs(si, null);
				});
			
				var expected = test.canOpen ? 'true' : 'false';
				
				it(`should return ${expected}`, () => {
					expect(result).to.be[expected];
				});
			});
		});
	});
}

export class CreateEmbedUrlTest {
	description : string; 
	url : string;
	containsPart : string;
	constructor(description : string, url : string, containsPart : string = null) {
		this.description = description;
		this.url = url;
		this.containsPart = containsPart;
	}
}

export function test_CreateEmbedUrl(site : EmbedUrlSite, id : string, embedUrlContents : string, tests : CreateEmbedUrlTest[]) : void {
	describe('#createEmbedUrl', () => {
		var result: string;
		
		tests.forEach((test) => {
			describe(test.description, () => {
				beforeEach(() => {
					var si = { url: test.url };
				
					result = site.createEmbedUrl(si);
				});
				
				it('should contain ' + embedUrlContents, () => {
					expect(result).to.contain(embedUrlContents);
				});
				
				it('should contain the video ID', () => {
					expect(result).to.contain(id);
				});
				
				if (test.containsPart != null) {
					it('should also contain ' + test.containsPart, () => {
						expect(result).to.contain(test.containsPart);
					});
				}
			});
		});
	});
}