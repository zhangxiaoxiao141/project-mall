export default {
    addCounter(state,payload){
        payload.count += 1
    },
    addCart(state,payload){
        payload.checked = false
        state.cartList.push(payload)
    },
    modify(state,payload){
        payload.checked = !payload.checked
    }
    
    
}