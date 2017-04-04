/**
 * Created by CoderSong on 17/4/1.
 */

let pub = {},
  Promise = require('promise'),
  _ = require('underscore'),
  fs = require('fs'),
  path = require('path'),
  fileOperation = require('./../../utils/fileOperationUtil'),
  requestCheck = require('./../../utils/requestCheckUtil'),
  basicConf = require('./../../conf/basicConf'),
  resUtil = require('./../../utils/resReturnUtil'),
  regularMaker = require('./../../services/RegularMakerService'),
  parser = require('./../../services/ParserService');

/**
 * 通过选择获取正确集
 * @param req
 * @param res
 */
pub.chooseGetResult = (req, res) => {

  let args = {};
  requestCheck.requestBodyParamsCheck(req, res, 'chooseGetResult', args, (args) => {
    Promise.resolve(
      parser.chooseFileParser(args.body['choose'])
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
      resUtil.resSuccessHandler(res, {'results': results})
    })
  });
};

/**
 * 在线编辑（通过页面获得输入）
 * @param req
 * @param res
 */
pub.editByPage = (req, res) => {
  let args = {};
  requestCheck.requestBodyParamsCheck(req, res, 'editByPage', args, (args) => {
    try {
      // 同步写文件
      fileOperation.writeToFileSync(basicConf.PUBLIC_LIB.CLAB_LIB_CP.path, args.body['rule']);
      // 同步开进程运行CLab
      let ans = fileOperation.operationCLabSync(path.join(__dirname, '..', '..', 'public', 'CLab10', 'examples', 'shirt'), 'shirt');
      resUtil.resSuccessHandler(res, ans);
    } catch (err) {
      resUtil.resErrorHandler(res, basicConf.ERROR_INFO.INSIDE_ERR, err);
    }
  });
};

/**
 * 在线编辑（通过文件获得输入）
 * @param req
 * @param res
 */
pub.editByFile = (req, res) => {
  fileOperation.uploadingFile(req, (path) => {
    try {
      let content = fs.readFileSync('public/' + path).toString();
      fileOperation.writeToFileSync(basicConf.PUBLIC_LIB.CLAB_LIB_CP.path, content);
      let ans = fileOperation.operationCLabSync('public/CLab10/examples/shirt', 'shirt');
      resUtil.resSuccessHandler(res, ans);
    } catch (err) {
      resUtil.resErrorHandler(res, basicConf.ERROR_INFO.INSIDE_ERR, err);
    }
  }, (err) => {
    resUtil.resErrorHandler(res, err);
  })
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