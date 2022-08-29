import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入路由
import router from '@/router'

//引入仓库
import store from '@/store'

//三级联动全局组件TypeNav
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'

import { Button, MessageBox } from 'element-ui';

Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// ElementUI注册组件时，还有一种方法——挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert;


//引入MockServer.js---mock数据
import '@/mock/mockServe'

//引入swiper样式
import "swiper/css/swiper.css"

import {reqGetSearchInfo} from '@/api'
// console.log(reqGetSearchInfo({}));

// 测试
 import {reqCategoryList} from '@/api';
// reqCategoryList();

// 懒加载
import VueLazyload from 'vue-lazyload'
import view1 from '@/assets/view1.jpg'

// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'

// 引入自定义插件(演示用)
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins)

// 引入表单验证插件
import '@/plugins/validate'

Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading: view1
})

new Vue({
  render: h => h(App),

  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },

  //注册路由：底下的写法KV一致省略V
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库，组件实例的身上会多出一个属性$store
  store
}).$mount('#app')
