var sites = {
	youtube: 'www.youtube.com',
	vimeo: 'www.vimeo.com'
};

module.exports = {
	sites: sites,
	all: Object.keys(sites).map(function (sitename) { return sites[sitename]; })
};