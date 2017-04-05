FROM 32bit/debian

MAINTAINER ShowMeCode

# 镜像的指令操作
# 修改debian的源更新apt-get
RUN echo 'deb http://security.debian.org/ jessie/updates main'> /etc/apt/sources.list
RUN echo 'deb-src http://security.debian.org/ jessie/updates main'>> /etc/apt/sources.list
RUN echo 'deb http://ftp.cn.debian.org/debian jessie main non-free contrib'>> /etc/apt/sources.list
RUN echo 'deb http://ftp.cn.debian.org/debian jess-proposed-updates main contrib no'>> /etc/apt/sources.list
RUN echo 'deb http://ftp.cn.debian.org/debian-security jessie/updates main contrib no'>> /etc/apt/sources.list
RUN echo 'deb-src http://ftp.cn.debian.org/debian/ jessie main contrib non-free'>> /etc/apt/sources.list
RUN echo 'deb http://apt.tt-solutions.com/ubuntu/ feisty main'>> /etc/apt/sources.list
RUN echo 'deb http://downloads.sourceforge.net/project/ubuntuzilla/mozilla/apt all main'>> /etc/apt/sources.list
RUN echo 'deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main'>> /etc/apt/sources.list
RUN echo 'deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu precise main'>> /etc/apt/sources.list
RUN apt-get update

# 安装nodejs和npm
RUN apt-get -y install git-core curl build-essential openssl libssl-dev
RUN git init
RUN git clone https://github.com/joyent/node.git
RUN cd node
RUN ls
RUN ./configure
RUN make
RUN make install
RUN apt-get -y install npm
RUN node -v
RUN npm --registry=https://registry.npm.taobao.org install --g n
RUN n v6.2.2

# 安装需要的工具
RUN apt-get -y install make g++ byacc flex

# 将项目复制到镜像中
COPY . /ClabServer
RUN ls
RUN cd /ClabServer

# 安装项目依赖
RUN mkdir logs
RUN npm --registry=https://registry.npm.taobao.org install
RUN bower install bootstrap

# 暴露端口
EXPOSE 3000:3000

# 启动项目
CMD ["nodemon", "app.js"]

