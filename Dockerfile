FROM 32bit/debian

MAINTAINER ShowMeCode

# 镜像的指令操作
# 修改debian的源更新apt-get
RUN echo 'deb http://mirrors.163.com/debian jessie main non-free contrib'> /etc/apt/sources.list
RUN echo 'deb http://mirrors.163.com/debian jessie-proposed-updates main contrib non-free'>> /etc/apt/sources.list
RUN echo 'deb http://mirrors.163.com/debian-security jessie/updates main contrib non-free'>> /etc/apt/sources.list
RUN echo 'deb http://security.debian.org jessie/updates main contrib non-free'>> /etc/apt/sources.list
RUN apt-get update

RUN apt-get -y install curl tar

# 配置环境变量
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.2.2
ENV WORK_DIR /ClabServer

# 下载和配置Node.js环境
# 这些命令一定要写在一起, 否则`nvm`命令会找不到
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh >> install.sh
RUN ["/bin/bash", "-c", "sh install.sh && source /usr/local/nvm/nvm.sh && nvm install v6.2.2 && nvm use v6.2.2 && nvm alias default v6.2.2"]

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

# 安装需要的工具
RUN apt-get -y install make g++ byacc flex npm

# 将项目复制到镜像中
WORKDIR ~
COPY . /ClabServer
WORKDIR /ClabServer

# 安装项目依赖
RUN mkdir logs
RUN ls
RUN ["/bin/bash", "-c", "npm --registry=https://registry.npm.taobao.org install"]
RUN ["/bin/bash", "-c", "npm --registry=https://registry.npm.taobao.org install bower"]
RUN ["/bin/bash", "-c", "bower install bootstrap"]

# 暴露端口
EXPOSE 3000:3000

# 启动项目
CMD ["nodemon", "app.js"]

