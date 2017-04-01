/**
 * Created by CoderSong on 17/3/13.
 */
exports.pageSize = 10;

exports.PUBLIC_LIB = {

  // CLab库的cp文件
  CLAB_LIB_CP: {
    path: '/CLab10/examples/shirt/shirt.cp',
    name: 'CLAB_LIB_CP'
  },

  CLAB_LIB_DUMP: {
    path: '/CLab10/examples/shirt/outputDump.dump',
    name: 'CLAB_LIB_DUMP'
  },

  CLAB_LIB_OUT: {
    path: '/CLab10/examples/shirt/output.out',
    name: 'CLAB_LIB_OUT'
  }
};

exports.ERROR_INFO = {

  SUCCESS: {
    'number': 200,
    'value': '操作成功完成'
  },

  // 错误状态码
  REQUEST_ERR: {
    'number': 401,
    'value': '携带参数不完整'
  },
  INSIDE_ERR: {
    'number': 402,
    'value': '函数内部错误'
  },
  INVALID_ERR: {
    'number': 403,
    'value': '无效请求（涉及不存在属性的修改）'
  },
  EXIST_ERR: {
    'number': 404,
    'value': '不已经存在字段'
  }
};