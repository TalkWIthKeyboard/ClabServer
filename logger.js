/**
 * Created by CoderSong on 17/4/5.
 */

log4js = require('log4js');

// 日志配置
log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'dateFile',
    filename: 'logs/',
    pattern: "yyyy-MM-dd.log",
    alwaysIncludePattern: true,
    maxLogSize: 1024,
    backup: 4,
    category: 'logInfo'
  }]
});

levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL
};

exports.logger = function (name, level) {
  let logger = log4js.getLogger(name);
  logger.setLevel(levels[level] || levels['debug']);
  return logger;
};

exports.use = function (app, level) {
  app.use(log4js.connectLogger(log4js.getLogger('logInfo'), {
    level: levels[level] || levels['debug'],
    format: ':method :url :status'
  }));
};