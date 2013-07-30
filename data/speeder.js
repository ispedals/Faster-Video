self.on("context", function (node) {
	var videos = Array.prototype.slice.call(document.getElementsByTagName("video"));
	//TODO: can't access contentDocument of iframe from content script so we can't access videos in iframes, which is a problem with iframe embeded videos
	// var iFrames = document.getElementsByTagName("iframe");
	// if (iFrames.length > 0) {
	// for (var i = 0; i < iFrames.length; i++) {
	// videos.concat(
	// Array.prototype.slice.call(
	// iFrames[i].contentDocument.getElementsByTagName("video")
	// )
	// );
	// }
	// }
	videos = videos.filter(function (video) {
		return !video.paused;
	});
	if (videos.length === 1) {
		self.postMessage(videos[0].playbackRate + "X");
		return true;
	} else {
		self.postMessage('reset');
		return false;
	}
});

self.on("click", function (node, data) {
	var videos = Array.prototype.slice.call(document.getElementsByTagName("video"));
	videos = videos.filter(function (video) {
		return !video.paused;
	});
	if (data.endsWith('X')) {
		videos[0].playbackRate = parseFloat(data.slice(0, -1));
		return;
	}
	data = parseFloat(data);
	videos[0].playbackRate += data;
});