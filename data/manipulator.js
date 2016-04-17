self.on("context", function (node) {
  let elems = Array.prototype.slice.call(document.querySelectorAll("video, audio"));
  /*
    TODO
    Content scripts can't access content hosted in an iframe, if that content is served from a different domain,
    so we can't access videos in iframes, which is a problem with iframe embeded videos
    https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/guides/content-scripts/cross-domain.html

    we could try whitelisting domains under the "cross-domain-content" key for various video sites
  */
  elems = elems.filter(function (elem) {
    return !elem.paused;
  });
  if (elems.length === 1) {
    self.postMessage(elems[0].playbackRate + "X");
    return true;
  } else {
    self.postMessage('reset');
    return false;
  }
});

self.on("click", function (node, data) {
  let elems = Array.prototype.slice.call(document.querySelectorAll("video, audio"));
  elems = elems.filter(function (elem) {
    return !elem.paused;
  });
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
