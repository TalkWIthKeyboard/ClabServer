/**
 * Created by CoderSong on 17/3/13.
 */

let pub = {},
  resUtil = require('./../../utils/resReturnUtil');

/**
 * 产品选择页面
 * @param req
 * @param res
 */
pub.choosePage = (req, res) => {
  resUtil.renderPageHandler(res, 'choosePage', '产品选择');
};

/**
 * 一致性检查页面
 * @param req
 * @param res
 */
pub.checkoutPage = (req, res) => {
  resUtil.renderPageHandler(res, 'checkoutPage', '一致检查');
};

/**
 * 在线编辑页面
 * @param req
 * @param res
 */
pub.editPage = (req, res) => {
  resUtil.renderPageHandler(res, 'editPage', '在线编辑')
};

/**
 * 默认主页
 * @param req
 * @param res
 */
pub.indexPage = (req, res) => {
  res.redirect('/client/editServer');
};

module.exports = pub;


