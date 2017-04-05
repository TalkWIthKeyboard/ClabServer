FROM 32bit/debian

MAINTAINER ShowMeCode

# 镜像的指令操作
# 修改debian的源更新apt-get
RUN echo 'deb http://mirrors.163.com/debian jessie main non-free contrib'> /etc/apt/sources.list
RUN echo 'deb http://mirrors.163.com/debian jessie-proposed-updates main contrib non-free'>> /etc/apt/sources.list
RUN echo 'deb http://mirrors.163.com/debian-security jessie/updates main contrib non-free'>> /etc/apt/sources.list
RUN echo 'deb http://security.debian.org jessie/updates main contrib non-free'>> /etc/apt/sources.list
RUN apt-get update

RUN apt-get -y install curl

# 配置环境变量
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.2.2
ENV WORK_DIR /ClabServer

# 下载和配置Node.js环境
# 这些命令一定要写在一起, 否则`nvm`命令会找不到
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -   apt-get install -y nodejs
RUN node -v

# 安装需要的工具
RUN apt-get -y install make g++ byacc flex

# 将项目复制到镜像中
WORKDIR ~
COPY . /ClabServer
WORKDIR /ClabServer

# 安装项目依赖
RUN mkdir logs
RUN ls
RUN npm --registry=https://registry.npm.taobao.org install
RUN bower install bootstrap

# 暴露端口
EXPOSE 3000:3000

# 启动项目
CMD ["nodemon", "app.js"]

