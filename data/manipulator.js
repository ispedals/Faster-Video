self.on("context", function (node) {
  let videos = Array.prototype.slice.call(document.getElementsByTagName("video"));
  /*
    TODO
    Content scripts can't access content hosted in an iframe, if that content is served from a different domain,
    so we can't access videos in iframes, which is a problem with iframe embeded videos
    https://addons.mozilla.org/en-US/developers/docs/sdk/latest/dev-guide/guides/content-scripts/cross-domain.html

    we could try whitelisting domains under the "cross-domain-content" key for various video sites
  */
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
  let videos = Array.prototype.slice.call(document.getElementsByTagName("video"));
  videos = videos.filter(function (video) {
    return !video.paused;
  });
  if (data.endsWith('X')) {
    //fixed value, strip X
    let rate = data.slice(0, -1);
    rate = parseFloat(rate)
    videos[0].playbackRate = rate;
    return;
  }
  data = parseFloat(data);
  videos[0].playbackRate += data;
});