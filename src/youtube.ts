/// <reference path="./dts/queryString.d.ts" />
import queryString = require('query-string');
import types = require("./types");

export let site = {
	name : "YouTube",
	domains: ["www.youtube.com"],
	openFs: (si : types.SiteInformation) => {
		var listPattern = / /;
		var isList = listPattern.test(si.url);  
	}
};