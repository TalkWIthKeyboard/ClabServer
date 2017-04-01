/**
 * Created by CoderSong on 17/4/1.
 */

let pub = {},
  Promise = require('promise'),
  _ = require('underscore'),
  fs = require('fs'),
  errorInfo = require('./../../conf/basicConf').ERROR_INFO,
  resUtil = require('./../../utils/resReturnUtil'),
  regularMaker = require('./../../services/RegularMakerService'),
  parser = require('./../../services/ParserService');

/**
 * 通过选择获取正确集
 * @param req
 * @param res
 */
pub.chooseGetResult = (req, res) => {

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
 * 在线编辑（通过页面获得输入）
 * @param req
 * @param res
 */
pub.editByPage = (req, res) => {

  let rule = req.body.rule || false;

};

/**
 * 在线编辑（通过文件获得输入）
 * @param req
 * @param res
 */
pub.editByFile = (req, res) => {

};

/**
 * 一致性检查（通过页面获得输入）
 * @param req
 * @param res
 */
pub.checkoutByPage = (req, res) => {

};

/**
 * 一致性检查（通过文件获得输入）
 * @param req
 * @param res
 */
pub.checkoutByFile = (req, res) => {

};

module.exports = pub;