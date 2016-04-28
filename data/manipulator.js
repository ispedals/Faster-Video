function getElement(node){
	if(/^(video|audio)$/i.test(node.tagName)){
		return [node];
	}
	let elems = Array.prototype.slice.call(document.querySelectorAll("video, audio"));
	if(elems.length <= 1){
		return elems;
	}
	return elems.filter(elem => !elem.paused);
}

self.on("context", function (node) {
  let elems = getElement(node);
  if (elems.length === 1) {
    self.postMessage(elems[0].playbackRate + "X");
    return true;
  } else {
    self.postMessage('reset');
    return false;
  }
});

self.on("click", function (node, data) {
  let elems = getElement(node);
  if(elems.length !== 1){
	  return;
  }
  if (data.endsWith('X')) {
    //fixed value, strip X
    let rate = data.slice(0, -1);
    rate = parseFloat(rate)
    elems[0].playbackRate = rate;
    elems[0].defaultPlaybackRate = rate;
    return;
  }
  data = parseFloat(data);
  elems[0].playbackRate += data;
  elems[0].defaultPlaybackRate += data;
});
