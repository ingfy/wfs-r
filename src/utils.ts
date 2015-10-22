/// <reference path='../typings/tsd.d.ts' />

export function startsWith(whole : string, part : string) : boolean {
	return Array.prototype.slice.call(whole, 0, part.length).join('') == part;
};