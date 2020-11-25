const { PurgeCSS } = require('purgecss');
const cheerio = require('cheerio');

async function purgeUnusedCSS(html, css) {
  const result = await new PurgeCSS().purge({
    content: [{ raw: html, extension: 'html' }],
    css: [{ raw: css }],
  });

  return result[0].css;
}

module.exports = async function (html) {
  const $ = cheerio.load(html);
  const styleElements = $('style').toArray();
  $('style').remove();

  let css = '';

  for (let el of styleElements) {
    css += await purgeUnusedCSS($.html(), $(el).html());
  }

  $('head').append(`<style>${css}</style>`);

  return $.html();
};
