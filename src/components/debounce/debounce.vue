<template>
    <div class="debounce-warp" id="debounce">
        <div class="content" >我们不一样</div>
    </div>
</template>
<script>
import { clearTimeout, setTimeout } from 'timers';
export default {
    name:"debounce",
    mounted(){
        let debounce = document.getElementById('debounce');
        debounce.addEventListener('scroll', this.debounceFn(this.handle));
    },
    methods:{
        handle(e) {
            console.log(e)
        },
        // 防抖函数
        debounceFn(fn,wait){
            let timeout =null ;
            let interval = wait || 200;
            // 不要用箭头函数 会指向最上面的一层
            return function (){
                let args = arguments
                if(timeout!==null){
                    clearTimeout(timeout)
                }
                timeout = setTimeout(()=>{
                    fn.apply(this,args)
                },interval)
            }
        },
        // 截流函数
        Throttle (fn, wait) {
            let last;
            let timer;
            let interval = wait || 1000;
            // 不要用箭头函数 会指向最上面的一层
            return function () {
                let args = arguments;
                let now = +new Date();
                if (last && now - last < interval) {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        last = now;
                        fn.apply(this, args);
                    }, interval);
                } else {
                    last = now;
                    fn.apply(this, args);
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.debounce-warp{
    height: 100vh;
    width: 100%;
    overflow: auto;
    .content{
        height: 4000px;
    }
}
</style>


