//search模块的小仓库
import {reqGetSearchInfo} from "@/api"

const state = {
    //仓库初始状态
    searchList:{}

};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    //这里可以书写业务逻辑，但不能修改数据
    //获取search模块数据
    async getSearchList({state, dispatch,commit},params={}){
        //当前reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code==200){
            commit("GETSEARCHLIST",result.data)
        }
    }
};

//getters主要作用：简化仓库的数据
//可以把将来在组件中需要用的数据简化【将来组件在获取数据的时候就方便了】
const getters = {
    //计算新的属性:state,当前小仓库的数据
    goodsList(state) {
        //如果网络不好返回一个空数组，否则就是一个空对象
        return state.searchList.goodsList||[];
   },
   //品牌的数据
   trademarkList(state) {
        return state.searchList.trademarkList||[];
   },
   //商品属性
   attrsList(state) {
        return state.searchList.attrsList||[];
   }
};

export default{
    state,
    mutations,
    actions,
    getters
}