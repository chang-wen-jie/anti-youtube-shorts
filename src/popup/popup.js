'use strict';

const isChromium = typeof window.chrome !== 'undefined';
const isFirefox = typeof window.browser !== 'undefined';
const browser = isFirefox ? window.browser : window.chrome;

var onOff = document.querySelector('input[name=checkbox_ad]');

var allSettingsElements = onOff;

for (var i = 0; i < allSettingsElements.length; i++) {
    if (allSettingsElements[i]) {
        allSettingsElements[i].addEventListener('change', function() {
            saveOptions();
        });
    }
}

function saveOptions() {
    chrome.storage.local.set({onOffTTV: onOff.checked ? 'true' : 'false'});
}

function restoreOptions() {
    restoreToggle('onOffTTV', onOff);
}

function restoreToggle(name, toggle) {
    chrome.storage.local.get([name], function(result) {
        if (result[name]) {
            toggle.checked = result[name] == 'true';
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);