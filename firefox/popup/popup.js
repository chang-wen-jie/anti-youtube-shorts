'use strict';

const isChromium = typeof window.chrome !== 'undefined';
const isFirefox = typeof window.browser !== 'undefined';
const browser = isFirefox ? window.browser : window.chrome;

var onOff = document.querySelector('input[name=checkbox_ad]');
var proxy = document.querySelector('select[name=dropdown_proxy]');

var allSettingsElements = [onOff,blockingMessage,forcedQuality,proxy,proxyQuality];

for (var i = 0; i < allSettingsElements.length; i++) {
    if (allSettingsElements[i]) {
        allSettingsElements[i].addEventListener('change', function() {
            saveOptions();
        });
    }
}

function saveOptions() {
    chrome.storage.local.set({onOffTTV: onOff.checked ? 'true' : 'false'});
    chrome.storage.local.set({proxyTTV: proxy.options[proxy.selectedIndex].text});
}

function restoreOptions() {
    restoreToggle('onOffTTV', onOff);
    restoreDropdown('proxyTTV', proxy);
}

function restoreToggle(name, toggle) {
    chrome.storage.local.get([name], function(result) {
        if (result[name]) {
            toggle.checked = result[name] == 'true';
        }
    });
}

function restoreDropdown(name, dropdown) {
    chrome.storage.local.get([name], function(result) {
        if (result[name]) {
            var items = Array.from(dropdown.options).filter(item => item.text == result[name]);
            if (items.length == 1) {
                dropdown.selectedIndex = items[0].index;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);