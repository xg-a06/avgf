'use strict';

const fs = require('fs');
const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
const rootCheck = require('root-check');
const userHome = require('user-home');
const pathExists = require('path-exists');
const minimist = require('minimist');
const dotenv = require('dotenv');
const { logger, npm } = require('@avgf/utils');
const { LIMIT_NODE_VERSION, DEFAULT_CLI_HOME } = require('./const');
const pkg = require('../package.json');

const core = async () => {
  try {
    await checkVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    checkArgs();
    checkEnv();
  } catch (e) {
    logger.error(e.message);
  }
};

const checkVersion = async () => {
  const currentVersion = pkg.version;
  const npmName = pkg.name;
  const data = await npm.getNpmInfo(npmName);
  if (data) {
    const version = data['dist-tags']?.latest || '0.0.0';
    if (semver.gt(version, currentVersion)) {
      logger.warn(
        colors.yellow(
          `最新版本：${version} 已发布，当前版本：${currentVersion}，请手动执行 npm install -g ${npmName} 进行更新。`
        )
      );
    } else {
      logger.info(currentVersion);
    }
  }
};

const checkNodeVersion = () => {
  const { version: currentVersion } = process;
  if (!semver.gte(currentVersion, LIMIT_NODE_VERSION)) {
    throw new Error(
      colors.red(`avgf 需要v${LIMIT_NODE_VERSION}以上版本的node环境`)
    );
  }
};

const checkRoot = () => {
  rootCheck();
  console.log(process.geteuid());
};

const checkUserHome = () => {
  console.log(userHome);
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red(`当前登录用户主目录不存在！  `));
  }
};

const checkArgs = () => {
  const args = minimist(process.argv.slice(2));
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
    logger.level = process.env.LOG_LEVEL;
  }
  logger.verbose('test');
};

const createDefaultConfig = () => {
  const config = {
    home: userHome,
  };
  let cliHome = DEFAULT_CLI_HOME;
  if (process.env.CLI_HOME) {
    cliHome = path.join(userHome, process.env.CLI_HOME);
  }
  config.cliHome = cliHome;
  process.env.CLI_HOME_PATH = config.cliHome;
};

const checkEnv = () => {
  const envPath = path.resolve(userHome, '.env');
  if (pathExists(envPath)) {
    dotenv.config({ path: envPath });
  }
  createDefaultConfig();
  console.log(process.env.CLI_HOME_PATH);
};

module.exports = core;
