# ClabServer
## 项目结构
+ ClabSever
	+ conf：**系统的全局设置文件夹**
	+ public：**静态文件夹**
	+ routes：**路由文件夹**
	+ services：**业务文件夹**
	+ utils：**通用模块工具文件夹**
	+ views：**前端页面文件夹**
	+ .bowerrc：**Bower设置**
	+ .gitignore：**git省略文件**
	+ app.js：**项目入口**

## 启动
+ 保证nodejs环境
+ 克隆项目到工作环境
 
 ```
 $ git init
 $ git clone https://github.com/TalkWIthKeyboard/ClabServer
 ```
+ 安装node依赖项
 
 ```
 $ npm install
 ```
+ 安装前端依赖项
 
 ```
 $ bower install
 ```
+ 启动项目

 ```
 $ node app.js
 ```
 
## 思路
+ 目前 
	+ 现在的主要思路是由其他系统提供**out**与**setFile**（及**变量语义化文件**和**没有语义化的所有解集**），前端收集用户选择**choose**
	+ 然后将解集和用户选择转换为多个**二进制字符串**，多选项用*号代替，最后进行字符串的匹配获取所要求的解集。
+ 完善
	+ 将之前的CLab选择系统合并到当前系统当中，完善前端页面部分。 
	+ 引入nodemon自动化项目管理工具和nconf配置工具管理项目。
	+ 尝试优化多个异步模块，以及项目的生命周期。
+ 改进 
	