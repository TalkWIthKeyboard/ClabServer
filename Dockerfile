FROM 32bit/debian

MAINTAINER ShowMeCode

# 镜像的指令操作
# 修改debian的源更新apt-get
RUN echo 'deb http://mirrors.163.com/debian jessie main non-free contrib'> /etc/apt/sources.list
RUN echo 'http://mirrors.163.com/debian jessie-proposed-updates main contrib non-free'>> /etc/apt/sources.list
RUN echo 'http://mirrors.163.com/debian-security jessie/updates main contrib non-free'>> /etc/apt/sources.list
RUN echo 'deb http://security.debian.org jessie/updates main contrib non-free'>> /etc/apt/sources.list
RUN cat /etc/apt/sources.list
RUN apt-get update

# 安装需要的工具
RUN apt-get install make g++ byacc flex

# 安装nodejs和npm
RUN apt-get install nodejs
RUN apt-get install npm
RUN npm --registry=https://registry.npm.taobao.org install --g n
RUN n v6.2.2

# 将项目复制到镜像中
COPY . /ClabServer
WORKDIR /ClabServer

# 安装项目依赖
RUN cd ClabServer
RUN mkdir logs
RUN npm --registry=https://registry.npm.taobao.org install
RUN bower install bootstrap

# 暴露端口
EXPOSE 3000:3000

# 启动项目
CMD ["nodemon", "app.js"]

