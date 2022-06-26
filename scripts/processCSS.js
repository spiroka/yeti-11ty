const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const cssProcessor = postcss([
  postcssImport(),
  postcssPresetEnv({
    stage: 3,
    autoprefixer: { grid: 'autoplace' },
    browsers: ['> 1%'],
    features: {
      'nesting-rules': true,
    },
  }),
  cssnano({ preset: 'default' }),
]);

module.exports = function(content) {
  return cssProcessor
    .process(content, { from: 'src/_includes/styles/style.css' })
    .then(({ css }) => css)
    .catch((err) => console.error(err.stack));
};
