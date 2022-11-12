document.addEventListener('navigation', replaceUrl);

if (document.body) replaceUrl();

function replaceUrl() {
  if (!location.pathname.startsWith('/shorts')) {
    return;
  }

  const urlOld = window.location.href;
  const urlNew = urlOld.replace('shorts/', 'watch?v=');

  window.location.replace(urlNew);
}
