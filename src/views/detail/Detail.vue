<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imgLoad="imageLoad"></detail-goods-info>
            <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
        <!-- <toast :message = 'message' :show="show"></toast> -->
    </div>
  
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'

import {getDetail, Goods,GoodsParam,Shop,getRecommend} from "network/detail"


//import Toast from '@/components/common/toast/Toast'
//import { debounce } from '@/common/utils'


import { itemListenerMixin, backTopMixin} from '@/common/mixin'
import { debounce } from '@/common/utils'
export default {
    name: 'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        //Toast
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            /* message:'',
            show:false */
            //itemImageListener:null
        }
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh()
            // offsetTop值正确位置(图片加载完成) -->用了防抖操作
            this.getThemeTopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,(-this.themeTopYs[index]),200)
        },
        contentScroll(position){
            const positionY = -position.y
            this.isShowBackTop = (-position.y) > 800   //显示回到顶部
            let length = this.themeTopYs.length
            for (let i = 0 ; i < length - 1 ;i++){
                if(this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
        },
        addToCart(){
            //获取商品信息，加入购物车
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid

            //将商品添加到vuex购物车数据中
            //this.$store.commit('addToCart',product)
            this.$store.dispatch('addToCart',product).then(res => {
                /* this.show = true
                this.message = res

                setTimeout(() => {
                    this.show = false
                    this.message = ''
                },1500) */
                //console.log(this.$toast)
                this.$toast.show(res,2000)
            })

        }
    },
    created(){
        this.iid = this.$route.params.iid
        //请求详情数据
        getDetail(this.iid).then(res => {
            const data = res.result
            this.topImages = data.itemInfo.topImages
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.shop = new Shop(data.shopInfo)
            //商品详情数据
            this.detailInfo = data.detailInfo
            //参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate
            }
            //第一处 offsetTop值不对，created里面不能获取元素
            this.$nextTick(() => {

                //第二处 offseTop值不对，图片的高度没有被计算在内
                
            })
        })

        //请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })

        //offsetTop 防抖 debounce
        this.getThemeTopY = debounce( () => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
        },100)
    },
    mounted(){

        //第三处 offseTop值不对，数据还未获取到

        /* const refresh = debounce(this.$refs.scroll.refresh,200)
        this.itemImageListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImageListener ) */
    },
    updated(){
        //第四处 offseTop值不对，Dom还未渲染完
    },
    destroyed() {
        this.$bus.$off('itemImageLoad',this.itemImageListener )
    }
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}

.content{
    height: calc(100% - 44px - 52px);
}

.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>