const R = require('ramda');

const defaultConfig = require('./default');

// eslint-disable-next-line import/no-dynamic-require,global-require
const environmentConfig = require(`./environments/${defaultConfig.env}`);

module.exports = R.mergeDeepRight(defaultConfig, environmentConfig);
