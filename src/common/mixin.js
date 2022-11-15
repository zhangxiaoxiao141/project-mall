import { debounce } from "./utils"
import BackTop from 'components/content/backtop/BackTop'

export const itemListenerMixin = {
    data(){
        return {
            itemImageListener:null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,200)
        this.itemImageListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImageListener )
    }
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop: false
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500)
        }
    }
}