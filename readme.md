# CLabServer - Pack clab library
![build](https://img.shields.io/badge/build-passing-green.svg)![nodejs版本](https://img.shields.io/badge/node-6.2.2-orange.svg)![npm版本](https://img.shields.io/badge/npm-3.9.5-orange.svg)![docker版本](https://img.shields.io/badge/docker-17.03.0-orange.svg)![debian版本](https://img.shields.io/badge/debian-32bit-blue.svg)

使用nodejs的express框架对CLab库进行部分功能的封装，并因为CLab库仅支持debian32bit系统，所以使用Docker进行基于32bit/debian的nodejs镜像封装，进而继续进行daocloud的持续集成。

## Change Log
### To Do List
+ 前端页面优化
+ 解决Docker数据卷挂载取出

### v0.1.1（April 5, 2017）
+ 将在线编译功能迁移至该项目
+ 完成daocloud的持续集成
+ 优化封装后端的各种模块

### v0.1.0（Mar 16, 2017）
+ 初始化项目结构
+ 完成通过前端选择获取最终解集的功能

## Requirements
+ Bash（git）
+ Docker（17.03.0）

仅仅需要配备Docker环境，部署非常方便。

## File Structure

```
├── Dockerfile        // Docker的部署文件
├── app.js            // 项目配置 & 入口
├── conf              // 全局的配置常量
├── logger.js         // log4js的配置文件
├── logs              // 日志文件
├── nodemon.json      // nodemon的配置文件
├── package.json      // 包管理
├── public            // 静态文件
│   ├── CLab10
│   ├── file
│   ├── images
│   ├── javascripts
│   └── stylesheets
├── readme.md
├── routes            // 路由文件
├── services          // 对routes业务逻辑的支持
├── utils             // 封装的各功能模块
└── views             // 视图文件
```

## Installation

```
$ git init
$ git clone https://github.com/TalkWIthKeyboard/ClabServer.git
$ cd ClabServer
$ sudo docker build -t="clab-server:v1" .
```

## Quick Start

```
$ sudo docker run -it clab-server:v1
```

## Discussing
+ email：610347922@qq.com

## Document
+ [如果你也需要重新封装Nodejs镜像](http://www.jianshu.com/p/35bf12bb6416)
+ [Docker & DaoCloud 实践](http://www.jianshu.com/p/e3ddaee7826e)

