/* replace video pathname */

document.addEventListener('yt-navigate-start', replaceUrl);

if (document.body) replaceUrl();
else document.addEventListener('DOMContentLoaded', replaceUrl);

function replaceUrl() {
  if (!location.pathname.startsWith('/shorts')) return;

  var urlOld = window.location.href;
  var urlNew = urlOld.replace('shorts/', 'watch?v=');

  window.location.replace(urlNew);
}