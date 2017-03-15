/**
 * Created by CoderSong on 17/3/14.
 */

let pub = {},
  arrayOp = require('./arrayUtil'),
  _ = require('underscore');

/**
 * 十进制转二进制，并按长度占位
 * @param tenNumber
 * @param len
 * @param type 返回结果是字符串还是数组
 * @param cb
 * @constructor
 */
pub.TenToTwo = (tenNumber, len, type, cb) => {
  let result = tenNumber,
    ans = [],
    num = 0;

  // 单独处理0的情况
  if (result === 0) {
    ans[num] = 0;
    num ++;
  }

  while (result != 0) {
    ans[num] = result % 2;
    result = Math.floor(result / 2);
    num++;
  }

  // 用0占位
  for (let i = 0; i < len - num; i++) {
    ans[num] = 0;
    num++;
  }

  arrayOp.arrayFlip(ans, (v) => {
    if (type == 0) {
      cb(v);
    } else {
      let str = '';
      _.map(v, (value) => {
        str += value;
      });
      cb(str);
    }
  });
};

module.exports = pub;