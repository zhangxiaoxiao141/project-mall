<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
                        @tabClick="tabClick" 
                        ref="tabControl1"
                        class="tab-control" v-show="isTabFixed"></tab-control>
        <scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll" 
                :pull-up-load="true"
                @pullingUp="loadmore"
                >
            <home-swiper :banners="this.banners" @swiperImageLoad="swiperImageLoad"></home-swiper>  
            <recommend-view :recommends="this.recommends"></recommend-view>
            <feature-view></feature-view>
            <!-- <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control> -->
            <tab-control :titles="['流行','新款','精选']" 
                        @tabClick="tabClick" 
                        ref="tabControl2"
                        ></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
   
    </div>
  
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from '@/components/content/backtop/BackTop';

import {getHomeMultidata, getHomeGoods} from 'network/home';
import {debounce} from 'common/utils';

import Scroll from '@/components/common/scroll/Scroll';
export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        getHomeGoods,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page: 0,list:[]},
                'new':{page: 0,list:[]},
                'sell':{page: 0,list:[]},
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false
        }
    },
    created() {
        this.getHomeMultidata(),
        this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')


    },
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,200)
        /* const refresh = function(...args){
                if (timer){
                    clearTimeout
                }
                timer = setTimeout(() => {
                    this.$refs.scroll.refresh.apply(this,args)
                },delay)
            } */
        //监听item中图片加载完成
        this.$bus.$on('itemImageLoad',() => {
            //this.$refs.scroll && this.$refs.scroll.refresh
            refresh()
        })
        //赋值
        //this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    methods:{
        /*事件监听相关的*/
        tabClick(index){
            switch (index){
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500)
        },
        contentScroll(position){
            this.isShowBackTop = (-position.y) > 1000

            this.isTabFixed = (-position.y) > this.tabOffsetTop

        },
        loadmore(){
            this.getHomeGoods(this.currentType)

            //this.$refs.scroll.scroll.refresh()
        },
        swiperImageLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
        

        


        /*网络请求相关的 */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },
        getHomeGoods(type){
            const page = this.goods[type].page + 1
            getHomeGoods(type,page).then(res => {
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp()
            })
        }
    }
}
</script>

<style scoped>
#home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
}

.home-nav{
    background-color: var(--color-tint);
    color: white;
    /*原生时使用 因为其不better-scroll中,不会随着滚动 */
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
}

/* .tab-control{
    position: sticky;
    top: 0px;
    z-index: 9;
} */

.fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 9;
}
.content{
   /*  height: calc(100% - 93px);
    overflow: scroll;
    margin-top: 44px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
}

.tab-control{
    position: relative;
    z-index: 10;
}

</style>