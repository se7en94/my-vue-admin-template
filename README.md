# 后台管理系统模版


## Build Setup

```bash
# 克隆项目
git clone xxx

# 进入项目目录
cd xxx

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

#部署相关：
#1.生产环境打包
npm run build:prod

#2.项目部署
上传/dist 打包文件夹

#3.nginx转发配置
location ~ ^/api/ {
  proxy_pass http://xxx; #api地址
  proxy_redirect default;
  rewrite ^/api/(.*)$ /$1 break;
}
```

