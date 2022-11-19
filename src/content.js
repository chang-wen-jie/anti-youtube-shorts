var settings = {
  shorts: true
}

initialise();

document.addEventListener('yt-navigate-start', configurate);
if (document.body) configurate();
else document.addEventListener('DOMContentLoaded', configurate);

/* Initialise settings */
function initialise() {
  let storageItem = browser.storage.local.get(('enabledShorts'));
    storageItem.then((res) => {
      if (res.enabledShorts === undefined) {
        browser.storage.local.set({
          enabledShorts: true
        })
      } else if (!res.enabledShorts) {
        settings.shorts = false;
      }
      console.log('wat is res', res);
      console.log('wat is settings.shorts', settings.shorts);
  });
}

function configurate() {
  replaceUrl();
}

/* Replace YouTube shorts pathname */
function replaceUrl() {
  if (!settings.shorts) {
    if (!location.pathname.startsWith('/shorts')) return;

    var urlOld = window.location.href;
    var urlNew = urlOld.replace('shorts/', 'watch?v=');

    window.location.replace(urlNew);
  }
}
