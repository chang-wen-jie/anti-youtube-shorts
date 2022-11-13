document.addEventListener('navigation-start', replaceUrl);

if (document.body) replaceUrl();
else document.addEventListener('DOMContentLoaded', replaceUrl);

function replaceUrl() {
  if (!location.pathname.startsWith('/shorts')) {
    return;
  }

  const urlOld = window.location.href;
  const urlNew = urlOld.replace('shorts/', 'watch?v=');

  window.location.replace(urlNew);
}
