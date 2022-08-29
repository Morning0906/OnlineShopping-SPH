//配置路由的地方
// import { from } from 'core-js/fn/array';
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes'

//使用插件
Vue.use(VueRouter);

//引入store
import store from '@/store'

//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}


VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//配置路由
// 对外暴露VueRouter类的实例
let router = new VueRouter({
    routes,
    //滚动行为,跳转时回到最上方
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

//全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    //to：可以获取到要跳转的路由信息
    //from：获取到从哪个路由来的信息
    // next：放行函数 next()放行 next('/xxx')放行到指定路由 next(false)原路返回
    // next()
    // 用户登录了才会有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        // 用户已经登录了还想去login(不能去，会停留在首页)
        if (to.path == '/login') {
            next('/home')
        } else {
            // 登录了但去的不是login
            // 如果登录名已有
            if (name) {
                next()
            } else {
                // 没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了获取不到用户信息。重新登录
                    // 清除token
                    store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录时不能去交易相关【trade】、支付相关【pay paysuccess】、不能去个人中心
        // 如果去了上述路由，跳转到登录
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 ||toPath.indexOf('/center') != -1)  {
            // 把未登录时想去但未去成的信息存储于地址栏中
            next('/login?redirect='+toPath)
        } else {
            // 否则放行【home、search、shopcart】
            next()
        }

    }
})


export default router;