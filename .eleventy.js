const processCSS = require('./scripts/processCSS');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedNunjucksAsyncShortcode('css', processCSS);
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });

  return {
    dir: {
      input: 'src',
    },
  };
};

