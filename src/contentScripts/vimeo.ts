import {ContentScript, initialize} from '../contentScript';

function getVideoInfo(dom : HTMLElement) {
	let element = <HTMLVideoElement>dom.querySelector('video');
	
	return {currentTime : element.currentTime};
}

initialize({getVideoInfo : getVideoInfo});
