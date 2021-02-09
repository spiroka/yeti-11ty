const processCSS = require('./src/scripts/processCSS');
const purgeCSSFromHtml = require('./src/scripts/purgeUnusedCSS');

function purgeCSSTransform(content, outputPath) {
  if (outputPath.endsWith('.html')) {
    return purgeCSSFromHtml(content);
  }

  return content;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedNunjucksAsyncShortcode('css', processCSS);
  eleventyConfig.addTransform('purge-css', purgeCSSTransform);
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

  return {
    dir: {
      input: 'src',
    },
  };
};
