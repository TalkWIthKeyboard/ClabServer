/**
 * Created by CoderSong on 17/4/4.
 */

let pub = {},
    _ =  require('underscore'),
    resReturn = require('./resReturnUtil'),
    basic = require('./../conf/basicConf'),
    requestConf = require('./../conf/requestConf');

/**
 * req的body的参数检查
 * @param req
 * @param res
 * @param funcName
 * @param args
 * @param scb
 */
pub.requestBodyParamsCheck = (req, res, funcName, args, scb) => {
  let flag = true;
  args.body = {};

  _.map(requestConf.requestParams[funcName], (each) => {
    flag = req.body[each] ? flag : false;
  });

  if (flag) {
    _.map(requestConf.requestParams[funcName], (each) => {
      args.body[each] = req.body[each];
    });
    scb(args);
  } else {
    resReturn.resErrorHandler(res, basic.ERROR_INFO.REQUEST_ERR);
  }
};

module.exports = pub;