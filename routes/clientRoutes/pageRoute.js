/**
 * Created by CoderSong on 17/3/13.
 */

let pub = {},
  Promise = require('promise'),
  _ = require('underscore'),
  errorInfo = require('./../../conf/basicConf').ERROR_INFO,
  resUtil = require('./../../utils/resReturnUtil'),
  regularMaker = require('./../../services/RegularMakerService'),
  parser = require('./../../services/ParserService');

/**
 * 获取正确结果集
 * @param req
 * @param res
 */
pub.getResult = (req, res) => {

  let choose = req.body.choose || false;

  if (choose) {
    Promise.resolve(
      parser.chooseFileParser('color:Black,print:MIB')
    ).then(
      regularMaker.strMaker
    ).then((reduce) => {
      // 寻找所有可行解
      let results = [];
      _.map(global.setReduce, (result) => {
        regularMaker.compareStr(reduce, result, (flag) => {
          flag ? results.push(result) : null;
        })
      });
      resUtil.resSuccessHandler(res, {
        'results': results
      })
    })
  } else {
    resUtil.resErrorHandler(res, errorInfo.REQUEST_ERR)
  }
};

/**
 * 测试页面
 * @param req
 * @param res
 */
pub.testPage = (req, res) => {
  res.render('index', {
    'layout': false
  })
};

module.exports = pub;