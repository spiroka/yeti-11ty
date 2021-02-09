/**
 * https://github.com/zachleat/web-font-loading-recipes/blob/master/critical-foft-preload-fallback-optional.html
 */
(function () {
  if (sessionStorage.fontsLoadedCriticalFoftPreloadFallback) {
    document.documentElement.className += ' fonts-loaded';
  } else if ('fonts' in document) {
    Promise.all([
      document.fonts.load('400 1em Rubik'),
      document.fonts.load('300 1em Rubik'),
      document.fonts.load('700 1em Rubik'),
      document.fonts.load('italic 1em Rubik'),
      document.fonts.load('italic 300 1em Rubik'),
      document.fonts.load('italic 700 1em Rubik'),
    ]).then(function () {
      document.documentElement.className += ' fonts-loaded';
      sessionStorage.fontsLoadedCriticalFoftPreloadFallback = true;
    });
  } else {
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');
    script.src = 'js/loadFontsFallback.js';
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }
})();
