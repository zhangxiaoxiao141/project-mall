<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button 
                        class="check-button" 
                        :class="{checked:isSelectAll}" 
                        @click.native="checkClick"
                        ></check-button>
            <span>全选</span>
        </div>
        <div>
            合计:￥{{totalPrice}}
        </div>
        <div class="count" @click="calClick">
            去结算: ({{checkLength}})
        </div>

    </div>
  
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton';
export default {
    name:'CartBottomBar',
    components:{
        CheckButton,
    },
    computed:{
        totalPrice(){
            return this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => {
                return item.checked
            }).length
        },
        isSelectAll(){
            /* return this.$store.state.cartList.length != 0 && this.$store.state.cartList.filter(item => {
                return item.checked == false
            }).length == 0 */
            return this.$store.state.cartList.length != 0 && !(this.$store.state.cartList.find(item => !item.checked))
        }
    },
    methods:{
        checkClick(){
            if (this.isSelectAll){
                this.$store.state.cartList.forEach(item => {
                    item.checked = false
                })
            }
            else{
                this.$store.state.cartList.forEach(item => {
                    item.checked = true
                })
            }
        },
        calClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买的商品',2000)
            }
        }
    }

}
</script>

<style scoped>
.bottom-bar{
    height:40px;
    font-size: 14px;
    background: pink;
    position: relative;
    line-height: 40px;
    background-color: #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.check-content{
    display: flex;
    align-items: center;
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}

.count{
    background: red;
    width: 80px;
    text-align: center;
}
</style>