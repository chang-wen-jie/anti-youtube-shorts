document.addEventListener('DOMContentLoaded', getSettings);

var shorts = document.querySelector('#shorts');
var cards = document.querySelector('#cards');

var settings = [shorts, cards];

/* Detect setting changes */
for (var i = 0; i < settings.length; i++) {
  if (settings[i]) {
    settings[i].addEventListener('change', function() {
      saveSettings()
    });
  }
}

function saveSettings() {
  browser.storage.local.set({shorts: { enabled: shorts.checked ? true : false }});
  browser.storage.local.set({cards: { enabled: cards.checked ? true : false } });
  getSettings();
}

/* Display setting states */
function getSettings() {
  showSettings('shorts', shorts);
  showSettings('cards', cards);
}

function showSettings(setting, state) {
  browser.storage.local.get([setting], function(result) {
    if (result[setting]['enabled']) state.checked = result[setting]['enabled'];
  });
}
