document.addEventListener('yt-navigate-start', replaceUrl);

/* Replace YouTube shorts pathname */
function replaceUrl() {
  if (!location.pathname.startsWith('/shorts')) return;

  var urlOld = window.location.href;
  var urlNew = urlOld.replace('shorts/', 'watch?v=');

  window.location.replace(urlNew);
}

let storageItem = browser.storage.local.get(('enabledShorts'));
  storageItem.then((res) => {
    console.log('settingssssss', res);
    console.log('??????????', res.enabledShorts);
});
