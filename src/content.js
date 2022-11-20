// WORDT STEEDS GETRIGGERD? STOP IN EEN FUNCTIE?
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
      }
      console.log('wat is res', res);
      console.log('wat is settings', settings);
  });
}

function configurate() {
  let getSettings = browser.storage.local.get(('enabledShorts'));
  getSettings.then((res) => {
    settings.shorts = res.enabledShorts
  });
  replaceUrl();
}

/* Replace YouTube shorts pathname */
function replaceUrl() {
  if (!settings.shorts) {
    if (location.pathname.startsWith('/shorts')) {
      var urlOld = window.location.href;
      var urlNew = urlOld.replace('shorts/', 'watch?v=');

      window.location.replace(urlNew);
    }
  }
}
