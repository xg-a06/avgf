const log = require('npmlog');

const { LOG_LEVEL } = process.env;

log.level = LOG_LEVEL ?? 'info';
log.heading = 'avgf';

log.addLevel('success', 2000, { fg: 'green', bold: true });

module.exports = log;
