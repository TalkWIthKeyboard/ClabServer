'use strict';

const port = process.env.PORT || 4000,
  express = require('express'),
  Promise = require('promise'),
  path = require('path'),
  partials = require('express-partials'),
  bodyParser = require('body-parser'),
  parser = require('./services/ParserService'),
  app = express();

// 设置view的路径
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(partials());

// bodyParser 解析req.body的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 静态文件的路径
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

// 监听端口
app.listen(port);

// 路由分流
const serverRouter = require('./routes/server-router'),
  clientRouter = require('./routes/client-router'),
  apiRouter = require('./routes/api-router');
app.use('/api/', apiRouter);
app.use('/client/', clientRouter);


// 读入两个文件并进行预处理
// TODO 这边异步可能出现问题
let outFileReaderPromise = new Promise((resolve, reject) => {
  parser.outFileParser(__dirname + '/services/out.txt', (reduce, sumList, mapObj) => {
    let ans = {};
    ans.reduce = reduce;
    ans.sumList = sumList;
    ans.mapObject = mapObj;
    resolve(ans);
  }, (err) => {
    reject(err);
  });
});

let setFileReaderPromise = new Promise((resolve, reject) => {
  parser.setFileParser(__dirname + '/services/setfile.txt', (reduce) => {
    resolve(reduce);
  }, (err) => {
    reject(err);
  })
});

Promise.resolve(
  outFileReaderPromise
).then((value) => {
  global.reduce = value.reduce;
  global.sumList = value.sumList;
  global.mapObj = value.mapObject;
  return setFileReaderPromise
}).then((value) => {
  global.setReduce = value;
});


module.exports = app;