'use strict';
const { logger } = require('@avgf/utils');
const { Package } = require('@avgf/command');

const exec = (projectName, options) => {
  const { filePath, cachePath } = options;
  logger.verbose('filePath', filePath);
  logger.verbose('cachePath', cachePath);
  console.log(projectName, options);
  const pkg = new Package({});
};

module.exports = exec;
