const processCSS = require('./scripts/processCSS');
const purgeCSSFromHtml = require('./scripts/purgeUnusedCSS');

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
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });

  return {
    dir: {
      input: 'src',
    },
  };
};
