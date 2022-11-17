import { reject, resolve } from "core-js/fn/promise"

export default {
    addToCart(context,payload){
       return new Promise((resolve,reject) => {
        let product = context.state.cartList.find(item => item.iid === payload.iid)
        if(product){
            context.commit('addCounter',product)
            resolve('当前的商品数量加1')
        }
        else{
            payload.count = 1
            context.commit('addCart',payload)
            resolve('添加了新的商品')
        }
        })

    },
    modifyChecked(context,payload){
        context.commit('modify',payload)
    }

}