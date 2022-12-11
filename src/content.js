initialise();

document.addEventListener('yt-navigate-start', configurate);
if (document.body) configurate();
else document.addEventListener('DOMContentLoaded', configurate);

/* Initialise settings */
function initialise() {
  browser.storage.local.get(['shorts', 'cards']).then((res) => {
    if (res.shorts === undefined) browser.storage.local.set({shorts: { enabled: true }});
    if (res.cards === undefined) browser.storage.local.set({cards: { enabled: true }});
  });
  configurate();
}

function configurate() {
  browser.storage.local.get(['shorts', 'cards']).then((res) => {
    if (!res.shorts['enabled']) disableShorts();
    if (!res.cards['enabled']) disableEndCards(); 
    console.log('wat is res in confi', res);
  });
}

/* Disable settings */
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
