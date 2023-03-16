const processCSS = require('./scripts/processCSS');
const collectionSchemas = require('@11tyrocks/eleventy-plugin-collection-schemas');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedNunjucksAsyncShortcode('css', processCSS);
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });
  eleventyConfig.addNunjucksShortcode('currentYear', () => new Date().getFullYear().toString());
  eleventyConfig.addPlugin(collectionSchemas);

  if (process.env.NODE_ENV === 'test') {
    eleventyConfig.ignores.add('src/posts');
  } else {
    eleventyConfig.ignores.add('src/__mocks__');
  }

  return {
    dir: {
      input: 'src',
    },
  };
};

