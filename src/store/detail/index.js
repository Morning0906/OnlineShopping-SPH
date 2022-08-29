import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
//封装临时游客身份的模块uuid——生成一个随机字符串
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodsInfo:{},
    //游客临时身份
    uuid_token : getUUID()
}
const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    //获取产品信息的action
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if (result.code==200) {
            commit("GETGOODSINFO",result.data)
        }
    },

    //将产品添加到购物车
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的结果
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数值，只是返回code=200，代表操作成功
        // 因为服务器没有返回其他数据，因此不需要三连环返回数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // 当前这个函数如果执行返回Promise

        if (result.code==200) {
            return "ok"
        }else{
            //代表加入购物车失败
            return Promise.reject(new Error('false'))
        }
        

    }
}
const getters = {
    //简化数据
    //路径导航
    categoryView(state){
        //state.goodsInfo初始状态是空对象
        // 当前计算的categoryView属性值至少是一个空对象
        return state.goodsInfo.categoryView||{}
    },
    //产品信息
    skuInfo(state){
        return state.goodsInfo.skuInfo||[]
    },
    //售卖属性
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
    
}

export default{
    state,
    actions,
    mutations,
    getters

}
