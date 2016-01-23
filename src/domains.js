var sites = {
	youtube: 'www.youtube.com',
	vimeo: 'www.vimeo.com',
    twitch: ['www.twitch.tv', 'twitch.tv']
};

module.exports = {
	sites: sites,
	all: Object.keys(sites).map(function (sitename) { return sites[sitename]; })
};