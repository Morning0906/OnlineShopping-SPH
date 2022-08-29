<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home和search显示的，在登录、注册时隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //派发一个action||获取商品分类的三级分类列表（优化，考虑性能）
    this.$store.dispatch("getCategoryList")
  },
}
</script>

<style scoped>

</style>
