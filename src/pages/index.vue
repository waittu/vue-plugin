<template>
    <div class="index-warp">
        <h4 class="title">前端开发常用组件</h4>
        <ul class="list-warp">
            <template v-for="item in routerList">
                <li class="list"  :key="item.name" v-if="item.name!='index'" @click="openPage(item)">
                    <div class="title-item">{{item.meta.title}}</div>
                    <div class="icon"><i class="iconfont icon-right"></i></div>
                </li>
            </template>
            
        </ul>
    </div>
</template>
<script>
import router from "../router/routerList"
export default {
    name:"index",
    data() {
        return {
            routerList:router 
        }
    },
    methods:{
        // 打开
        openPage(item){
            this.$router.push({
                name:item['name']
            })
        }
    }
}
</script>
<style lang="less" scoped>
*{
    box-sizing: border-box;
}
.title{
    line-height: 100px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    font-size: 32px;
    background-color: #ffffff;
}
.list-warp{
    .list{
        height: 80px;
        display: flex;
        line-height: 80px;
        border-bottom: 1px solid #e5e5e5;
        padding: 0 20px;
    }
    .title-item{
        flex: 1;
        font-size: 28px;
    }
    .icon{
        flex: 0 80px;
        width: 80px;
        text-align: right;
        color: #999999
    }
}
</style>


