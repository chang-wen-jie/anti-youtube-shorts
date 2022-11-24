document.addEventListener('DOMContentLoaded', getSettings);

var shorts = document.querySelector('#shorts');
var endCards = document.querySelector('#end-cards');

var settings = [shorts, endCards];

/* Detect and save changed settings */
for (var i = 0; i < settings.length; i++) {
  if (settings[i]) {
    settings[i].addEventListener('change', function() {
      saveSettings()
    });
  }
}

function saveSettings() {
  browser.storage.local.set({enabledShorts: shorts.checked ? true : false});
  browser.storage.local.set({enabledEndCards: endCards.checked ? true : false});
  getSettings();
}

/* Display settings' correct states */
function getSettings() {
  displaySettings('enabledShorts', shorts);
  displaySettings('enabledEndCards', endCards);
}

function displaySettings(feature, state) {
  browser.storage.local.get([feature], function(result) {
    if (result[feature]) state.checked = result[feature];
  });
}
