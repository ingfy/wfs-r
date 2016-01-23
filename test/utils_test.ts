/// <reference path='../typings/tsd.d.ts' />
import chai = require('chai');
var expect = chai.expect;

import * as utils from '../src/utils';


describe('utils', () => {
	describe('.startsWith', () => {
		it('should result true for empty strings', () => {
			expect(utils.startsWith("", "")).to.be.true;
		});
		
		it('should result true for empty part string', () => {
			expect(utils.startsWith("asd", "")).to.be.true;
		});
		
		it('should result true when the strings are equal', () => {
			expect(utils.startsWith("asd", "asd")).to.be.true;
		});
		
		it('should result true when the part string is the start of the whole', () => {
			expect(utils.startsWith("asd blf kja", "asd")).to.be.true;
		});
		
		it('should result false when part string is at the end', () => {
			expect(utils.startsWith("bds", "sdb")).to.be.false;
		});
	});
    
    describe('.endsWith', () => {
        it('should detect the last part of a string', () => {
            expect(utils.endsWith("abc", "bc")).to.be.true;
        });
    });
});