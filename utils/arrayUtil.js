/**
 * Created by CoderSong on 17/3/14.
 */

let pub = {},
  _ = require('underscore');

/**
 * 翻转数组
 * @param arr
 * @param cb
 */
pub.arrayFlip = (arr, cb) => {
  let ans = [],
    num = arr.length - 1;
  _.map(arr, (value) => {
    ans[num] = value;
    num --;
  });

  cb(ans);
};

module.exports = pub;