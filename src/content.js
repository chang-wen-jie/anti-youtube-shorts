initialise();

document.addEventListener('yt-navigate-start', configurate);
if (document.body) configurate();
else document.addEventListener('DOMContentLoaded', configurate);

/* Initialise and apply configurations */
function initialise() { 
  browser.storage.local.get(['enabledShorts', 'enabledEndCards']).then((res) => {
    if (res.enabledShorts === undefined) browser.storage.local.set({enabledShorts: true});
    if (res.enabledEndCards === undefined) browser.storage.local.set({enabledEndCards: true});
    console.log('wat is res in ini', res);
  });
  configurate();
}

function configurate() {
  browser.storage.local.get(['enabledShorts', 'enabledEndCards']).then((res) => {
    if (!res.enabledShorts) disableShorts();
    if (!res.enabledEndCards) disableEndCards();
    console.log('wat is res in confi', res);
  });
}

/* Disable features */
function disableShorts() {
  if (location.pathname.startsWith('/shorts')) window.location.replace(window.location.href.replace('shorts/', 'watch?v='));
}

function disableEndCards() {
  let css = `
    div[class*="video-player"]:not(:hover) div[class^="ytp-ce"],
    div[class*="ytp-autohide"] div[class^="ytp-ce"] {
        display: none !important;
    }
  `;
  let styleNode = document.createElement("style");
  styleNode.appendChild(document.createTextNode(css));
  (document.querySelector("head") || document.documentElement).appendChild(styleNode);
}
