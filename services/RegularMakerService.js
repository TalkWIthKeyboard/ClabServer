/**
 * Created by CoderSong on 17/3/14.
 */

let pub = {},
  _ = require('underscore');

/**
 * 结构字符串转正则表达式（暂时不启用）
 * @param reduce
 */
pub.regularMaker = (reduce) => {

};

/**
 * 制作结构字符串
 * @param reduce
 */
pub.strMaker = (reduce) => {
  let str = '';
  _.map(global.reduce, (obj) => {
    if (_.has(reduce, obj.publicName)) {
      // 这个选项被选中的话，添加到答案集
      str += reduce[obj.publicName];
    } else {
      // 这个选项待选的话，用*占位
      for (let i = 0; i < obj.privateNum; i++) {
        str += '*';
      }
    }
  });
  return str;
};

/**
 * 查看str2是否被str1包含，*号无匹配规则
 * @param str1
 * @param str2
 */
pub.compareStr = (str1, str2, cb) => {
  let flag = true;
  if (str1.length != str2.length) {
    flag = false;
  } else {
    _.map(str1, (c, index) => {
      if (c != '*' && str2[index] != '*' && c != str2[index]) {
        flag = false;
      }
    })
  }
  cb(flag);
};

module.exports = pub;