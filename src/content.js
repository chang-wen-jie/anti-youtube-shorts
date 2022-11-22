initialise();

document.addEventListener('yt-navigate-start', configurate);
if (document.body) configurate();
else document.addEventListener('DOMContentLoaded', configurate);

/* Initialise settings */
function initialise() { 
  browser.storage.local.get(('enabledShorts')).then((res) => {
    if (res.enabledShorts === undefined) browser.storage.local.set({enabledShorts: true});
    console.log('wat is res in ini', res);
  });
  configurate();
}

/* Apply configurations */
function configurate() {
  let storateItem = browser.storage.local.get(('enabledShorts'));
  storateItem.then((res) => {
    if (res.enabledShorts === false) replaceUrl();
    console.log('wat is res in confi', res);
  });
}

/* Replace YouTube shorts pathname */
function replaceUrl() {
  console.log("ben ik hier?")
  if (location.pathname.startsWith('/shorts')) window.location.replace(window.location.href.replace('shorts/', 'watch?v='));
}
