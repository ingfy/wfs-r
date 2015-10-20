/// <reference path='../../typings/tsd.d.ts' />
/// <reference path='./query-string.d.ts' />

import queryString = require('query-string');

import types = require('../types');

export default new types.EmbedUrlSite("YouTube", ["www.youtube.com"], (si: types.SiteInformation) => {
	var query = queryString.parse(queryString.extract(si.url));
	var video = query['v'];
	
	if (!video && !query['list']) {
		throw Error("No video found!");
	}
	
	delete query['v'];
	
	return "https://www.youtube.com/embed/" + video + queryString.stringify(query);
});