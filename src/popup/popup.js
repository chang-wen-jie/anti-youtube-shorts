document.addEventListener('DOMContentLoaded', getSettings);

var shorts = document.querySelector('#shorts');
var endCards = document.querySelector('#end-cards');
var showOnHover = document.querySelector('#show-on-hover');

var settings = [shorts, endCards, showOnHover];

/* Detect setting changes */
for (var i = 0; i < settings.length; i++) {
  if (settings[i]) {
    settings[i].addEventListener('change', function () {
      setSettings();
    });
  }
}

function setSettings() {
  browser.storage.local.set({
    shorts: { enabled: shorts.checked ? true : false },
  });
  browser.storage.local.set({
    endCards: {
      enabled: endCards.checked ? true : false,
      showOnHover: showOnHover.checked ? true : false,
    },
  });

  getSettings();
}

/* Display setting states */
function getSettings() {
  showSettings('shorts', shorts);
  showSettings('endCards', endCards);
}

function showSettings(setting, checkbox) {
  browser.storage.local.get([setting], function (result) {
    console.log('result:', result[setting]);
    if (result[setting]['enabled']) checkbox.checked = result[setting]['enabled'];
    if (result[setting]['showOnHover']) showOnHover.checked = result[setting]['showOnHover'];
  });
}
