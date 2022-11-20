document.addEventListener('DOMContentLoaded', getSettings);

var shorts = document.querySelector('#shorts');
var settings = [shorts];

/* Detect setting changes */
for (var i = 0; i < settings.length; i++) {
  if (settings[i]) {
    settings[i].addEventListener('change', function() {
      storeSettings()
    });
  }
}

/* Store changed settings */
function storeSettings() {
  browser.storage.local.set({
    enabledShorts: shorts.checked ? true : false
  });
  console.log("settings saved");
  getSettings();
}

/* Get stored settings */
function getSettings() {
  let storageItem = browser.storage.local.get(('enabledShorts'));
  storageItem.then((res) => {
    shorts.checked = res.enabledShorts

    if (res.enabledShorts === true) document.querySelector('#shorts_state').innerText = "Shorts Enabled";
    else document.querySelector('#shorts_state').innerText = "Shorts Disabled";
  });
}
