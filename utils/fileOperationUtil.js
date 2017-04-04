/**
 * Created by CoderSong on 17/4/4.
 */

let pub = {},
  fs = require('fs'),
  path = require('path'),
  multiparty = require('multiparty'),
  fileType = require('./../conf/basicConf').FILE_TYPE,
  error = require('./../conf/basicConf').ERROR_INFO,
  _ = require('underscore'),
  ex = require('child_process').execSync;

/**
 * 同步写内容到文件中
 * @param file
 * @param content
 */
pub.writeToFileSync = (file, content) => {
  let fd = fs.openSync(file, 'w');
  let writeBuf = new Buffer(content);
  fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0);
  fs.closeSync(fd);
};

/**
 * 同步操作CLab文件并获取结果
 * @param opFile 操作的文件夹地址
 * @param exeFileName 可执行文件名
 */
pub.operationCLabSync = (opFile, exeFileName) => {
  let execIn = './' + exeFileName;
  let dump = path.join(opFile, 'outputDump.dump');
  let output = path.join(opFile, 'output.out');
  let res = {};
  ex('cd ' + opFile + '&& make clean && make &&' + execIn);
  res.detail = fs.readFileSync(dump).toString();
  res.summary = fs.readFileSync(output).toString();
  return res;
};

/**
 * 上传单个文件
 * @param req
 * @param scb
 * @param fcb
 */
pub.uploadingFile = (req, scb, fcb) => {

  // 保存路径
  dir = path.join(__dirname, '..', 'public', 'file') + '/';
  reDir = '/' + path.join('file') + '/';

  let form = new multiparty.Form({uploadDir: dir});
  form.parse(req, (err, fileds, files) => {
    if (err) {
      fcb(error.UPLOADING_ERR, err);
    } else {
      let inputFile = files.file[0];
      let upladedPath = inputFile.path;

      // 检测是不是符合要求的文件
      let flag = false;
      _.map(fileType, (each) => {
        flag = inputFile.headers['content-type'] == each ? true : flag;
      });

      if (flag) {
        let strLast = _.last(upladedPath.split('/'));
        scb(reDir + strLast)
      } else {
        // 删除非法文件
        fs.unlinkSync(upladedPath);
        fcb(error.UPLOADING_TYPE_ERR);
      }
    }
  })
};

module.exports = pub;