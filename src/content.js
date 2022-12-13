initialise();

document.addEventListener('yt-navigate-start', configurate);
if (document.body) configurate();
else document.addEventListener('DOMContentLoaded', configurate);

/* Initialise settings */
function initialise() {
  browser.storage.local.get(['shorts', 'endCards']).then((res) => {
    if (res.shorts === undefined)
      browser.storage.local.set({ shorts: { enabled: true } });
    if (res.endCards === undefined)
      console.log("endCards undefined!");
      browser.storage.local.set({
        endCards: { enabled: true, showOnHover: false },
      });
    // if (res.showOnHover === undefined)
    // browser.storage.local.set({
    //   showOnHover: false
    // });
  });
  configurate();
}

function configurate() {
  browser.storage.local.get(['shorts', 'endCards']).then((res) => {
    if (!res.shorts['enabled']) disableShorts();
    if (!res.endCards['enabled']) disableEndCards();
    console.log('wat is res in confi', res);
  });
}

/* Disable settings */
function disableShorts() {
  if (location.pathname.startsWith('/shorts'))
    window.location.replace(
      window.location.href.replace('shorts/', 'watch?v=')
    );
}

function disableEndCards() {
  let css = `
    div[class*="video-player"]:not(:hover) div[class^="ytp-ce"],
    div[class*="ytp-autohide"] div[class^="ytp-ce"] {
        display: none !important;
    }
  `;
  let styleNode = document.createElement('style');
  styleNode.appendChild(document.createTextNode(css));
  (document.querySelector('head') || document.documentElement).appendChild(
    styleNode
  );
}
