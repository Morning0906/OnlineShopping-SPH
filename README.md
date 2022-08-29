# 线上购物商城——PC端
## 功能
- 登录、注册、退出登录
- 浏览首页，根据商品分类进行查看
- 搜索商品
- 查看商品详情
- 选择购买数量，加入购物车
- 结算购物车
- 提交订单，进行支付
- 查看历史订单
## 技术分析
- Vue作为框架基础
- vue-router控制路由
- vuex状态管理
- ajax接入数据
- element-ui搭建页面组件
## 源码目录
- api：抽离出的单独的请求文件，请求后台的 url

- assets：前端的静态文件资源

- components：前端的页面的组件

- router：前端路由系统，详见 Vue-Router 文档

- store：前端状态管理系统，详见 Vuex 文档

- utils：页面中的某会被复用的方法，如计算日期、格式化日期的方法，会被抽离到 utils 中，再在各个页面中被引入

- pages（重点）：每个页面的代码都在这里

- App.vue：最外层容器页面

- main.js：入口文件

- settings.js：配置文件（无需更改）
## 项目启动方式
- 首先安装nodejs 与 npm 环境。
使用 cmd 或其他命令行工具移动至本项目目录下，运行：

- $ npm install

- $ npm run serve

- 浏览器输入 http://localhost:8080
