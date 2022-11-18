document.addEventListener('DOMContentLoaded', getSettings);

let shorts = document.querySelector('#shorts');
let settings = [shorts];

/* Detect setting changes */
for (var i = 0; i < settings.length; i++) {
  if (settings[i]) {
    settings[i].addEventListener('change', storeSettings);
  }
}

/* Store changed settings */
function storeSettings() {
  browser.storage.local.set({
    enabledShorts: shorts.value
  });
  getSettings();
}

/* Get stored settings */
function getSettings() {
  let storageItem = browser.storage.local.get(('enabledShorts'));
  storageItem.then((res) => {
    document.querySelector('#status').innerText = res.enabledShorts;
  });
}
