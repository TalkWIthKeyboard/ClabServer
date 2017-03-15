/**
 * Created by CoderSong on 17/3/13.
 */

let fs = require('fs'),
  _ = require('underscore'),
  errorInfo = require('./../conf/basicConf').ERROR_INFO,
  binaryOp = require('./../utils/binaryUtil'),
  pub = {};


/**
 * out文件预处理
 * @param reduce
 * @param scb
 */
let outFilePreTreated = (reduce, scb) => {
  // sumList 前n项和
  // mapObj publicName的位置映射
  let sumList = [],
    sum = 0,
    mapObj = {};

  _.map(reduce, (value, index) => {
    sum += value.privateNum;
    sumList.push(sum);
    mapObj[value.publicName] = index;
  });

  scb(reduce, sumList, mapObj);
};


/**
 * 读取out文件转内存
 * @param path
 * @param scb
 * @param fcb
 * @constructor
 */
pub.outFileParser = (path, scb, fcb) => {
  fs.readFile(path, (err, data) => {
    if (err) return fcb(err);
    this.reduce = [];

    let dataList = _.compact(data.toString().split('\n'));
    _.map(dataList, (value, objIndex) => {
      let strList = value.substring(0, value.length - 1).split(',');
      let key = null;
      let num = 0;
      this.reduce[objIndex] = {};
      this.reduce[objIndex].private = {};

      _.map(strList, (v, index) => {
        if (index === 0) {
          this.reduce[objIndex].publicName = v
        } else if (index === 1) {
          this.reduce[objIndex].privateNum = +v
        } else if (index % 2 === 0) {
          key = v;
        } else {
          // TODO 这边待优化代码结构
          binaryOp.TenToTwo(+v, this.reduce[objIndex].privateNum, 1, (binary) => {
            this.reduce[objIndex].private[key] = binary;
            num++;
          });
        }
      });
    });
    // 预处理
    outFilePreTreated(this.reduce, scb);
  });
};


/**
 * 读取setfile文件解析转内存
 * @param path
 * @param scb
 * @param fcb
 * @constructor
 */
pub.setFileParser = (path, scb, fcb) => {
  fs.readFile(path, (err, data) => {
    if (err) return fcb(err);
    this.reduce = [];
    let dataList = _.compact(data.toString().split('>'));
    _.map(dataList, (value, index) => {
      let strList = value.replace(/\s+/g, '').substring(1, value.length).split(',');
      this.reduce[index] = '';
      let num = 0;
      let key = 0;
      _.map(strList, (v) => {
        let objList = v.split(':');

        if (objList[0] != num) {
          for (let i = 0; i < objList[0] - num; i++) {
            this.reduce[index] += '*';
          }
          num = objList[0];
        }
        this.reduce[index] += objList[1];
        num++;
        key = objList[0];
      });

      for (let i = key; i < _.last(global.sumList) - 1; i++) {
        this.reduce[index] += '*';
      }
    });
    scb(this.reduce);
  });
};


/**
 * 前端选择文件解析转内存
 * @param data
 * @param scb
 * @param fcb
 */
pub.chooseFileParser = (data, scb, fcb) => {
  this.reduce = {};
  let dataList = _.compact(data.toString().split(','));
  _.map(dataList, (value) => {
    let strList = value.split(':');
    if (_.has(global.mapObj, strList[0])) {
      // public在原始数据中的顺序数
      let num = global.mapObj[strList[0]];
      this.reduce[strList[0]] = global.reduce[num].private[strList[1]];
    } else {
      // TODO 这个地方有问题
      fcb(errorInfo.EXIST_ERR)
    }
  });
  return this.reduce;
};

module.exports = pub;


