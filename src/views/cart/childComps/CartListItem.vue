<template>
    <div class="cart-list-item">
        <check-button :is-checked="item.chcked" @click.native="checkClick" :class="{check:true,checked:item.checked}"/>
        <div class="cart-content">
            <img :src="item.image" alt="">
            <div class="good-mess">
                <div class="title">{{item.title}}</div>
                <!-- <div class="desc">
                    <p>样式：{{item.styleColor}}</p>
                    <p>尺码：{{item.rule}}</p>
                </div> -->
                   <div class="buy">
                <span class="price">￥{{item.price}}</span>
                <span class="count"> x{{item.count}}</span>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton"
export default {
    name:'CartList',
    components:{
        CheckButton,
    },
    props:{
        item:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        checkClick(){
            this.$store.dispatch("modifyChecked",this.item);
        }
    } 

}
</script>
<style scoped>
.cart-list-item{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid rgb(202, 202, 202);
}
.check{
    margin-right: 5px;
    
}
.cart-content{
    width: 100%;
}
.cart-content img{
    width: 20%;
    border-radius: 5px;
}
.good-mess{
    display: inline-block;
    width: 79%;
    padding: 5px 10px;
    margin-top: 5px;
    position: relative;
    top: -20px;
}
.title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
}
.desc{
    font-size: 14px;
}
.desc p{
    margin-top: 8px;
}

.count{
    float: right;
    margin-right: 10px;
}
.buy{
    margin-top: 20px;
}
.price{
    font-size: 18px;
    color: orangered;
}
.count{
    color: #333;
}

.checked{
    background: red;
}
</style>