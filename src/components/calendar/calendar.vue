<template>
    <div class="date-warp">
        <div class="herder-warp">
            <div class="week-warp">
                <div v-for="(item,index) in weekList" :key="index">{{ item.label }}</div>
            </div>
        </div>
        <div class="days-warp">
            <div class="content-warp" v-for="(item,itemIndex) in list" :key="itemIndex">
                <div class="title">{{item.year}}年{{item.month+1}}月</div>
                <ul class="day-list">
                    <li class="item" v-for="(day,index) in item.currentDay"
                        :key="index"
                        :class="{'current-month':day.currentMonth}"
                        @click="changeDay(day)"
                        :style="isCrrentDay(day)" >
                        <div v-if="day.currentMonth">{{day.value}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'calendar',
    data() {
        return {
            dateValue: "", // 输入框显示日期
            currentDate: '', // 当前日期
            panelState: false, // 初始值，默认panel关闭
            tmpMonth: new Date().getMonth(), // 临时月份，可修改
            month: new Date().getMonth(),
            tmpYear: new Date().getFullYear(), // 临时年份，可修改
            weekList: [
                { label: "周日", value: 0 },
                { label: "周一", value: 1 },
                { label: "周二", value: 2 },
                { label: "周三", value: 3 },
                { label: "周四", value: 4 },
                { label: "周五", value: 5 },
                { label: "周六", value: 6 }
            ], // 周
            list:[],
            aroud:2,// 显示几个月
        }
    },
    created() {
        this.getMouthList();
    },
    methods: {
        // 获取某一个月数据列表
        dateList(tmpYear,tmpMonth){
            // 获取当月天数
            let currentMonthLength = new Date(tmpYear, tmpMonth + 1,  0 ).getDate();
            //先将当月的日期塞入dateList
            let dateList = Array.from({ length: currentMonthLength }, (val, index) => {
                    return {
                        currentMonth: true,
                        value:index + 1,
                        date:`${tmpYear}-${this.transformNumber(tmpMonth + 1)}-${this.transformNumber(index + 1)}`
                    };
                }
            );
            // 确认上个月一共多少天
            let previousMongthLength = new Date(tmpYear, tmpMonth, 0 ).getDate()
            // 在1号前插入上个月日期
            let previousMonthDays = []
            // 获取当月第一天是礼拜几
            let fistWeek = new Date(`${tmpYear}/${tmpMonth+1}/1`).getDay()
            for(let i=0;i<fistWeek;i++){
                previousMonthDays.unshift({
                    currentMonth:false,
                    value:previousMongthLength-i,
                    date:`${tmpYear}-${this.transformNumber(tmpMonth)}-${this.transformNumber(previousMongthLength-i)}`
                })
            }
            // 在最后一天插入下月天数
            let nextMonthDays = []
            dateList = [...previousMonthDays,...dateList]
            for(let i=0;i<42-dateList.length;i++){
                nextMonthDays.push({
                    currentMonth:false,
                    value:i+1,
                    date:`${tmpYear}-${tmpMonth>=11?'01':this.transformNumber(tmpMonth+2)}-${this.transformNumber(i+1)}`
                })
            }
            return [...dateList,...nextMonthDays]
        },
        // 计算拿出需要显示的数据
        getMouthList(){
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            let number = 0
            for(let i=0;i<this.aroud;i++){
                const item = {}
                if(month+i>11){
                    item.year = year+1;
                    item.month = (number++)
                }else{
                    item.year = year;
                    item.month = (month+i)
                }
                item.currentDay = this.dateList(item.year,item.month)
                this.list.push(item)
            }
        },
        // 当天样式显示
        isCrrentDay(day){
            let currentDay = ''
            if(this.currentDate){
               currentDay =  this.currentDate
            }else{
                let currentY = new Date().getFullYear()
                let currentM = new Date().getMonth()
                let currentD = new Date().getDate()
                currentDay = `${currentY}-${this.transformNumber(currentM+1)}-${this.transformNumber(currentD)}`
            }
            if(currentDay===day.date&&day['currentMonth']){
                return {
                    backgroundColor:'#007fff',
                    color:"#ffffff",
                    borderRadius: "50%"
                }
            }
        },
        // 换算
        transformNumber(num){
            if(parseInt(num)<10){
                return `0${num}`
            }else{
                return num
            }
        },
        // 时间改变
        changeDay(day){
            if(!day['currentMonth']){return}
            this.currentDate = day.date
        }
    },
}
</script>
<style lang="less" scoped>
.herder-warp{
    height: 100px;
    width: 100%;
    .week-warp{
        display: flex;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        justify-content: space-around;
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        background-color: #ffffff;
        border-bottom: 2px solid #e5e5e5;
        position: fixed;
        top:0;
        left: 0;
    }
}
.days-warp{
    width: 100%;
    .content-warp{
        margin-top: 20px;
        background-color: #ffffff;
        .title{
            height: 80px;
            line-height: 80px;
            text-align: center;
            border-bottom: 2px solid #f0f0f0;
        }
    }
    .day-list{
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .item{
            width: 14.28%;
            flex: 0 14.28%;
            height: 100px;
            text-align: center;
            line-height: 100px;
            font-size: 32px;
            color: #999;
        }
        .current-month{
            color: #222222;
        }
    }
}
    
</style>
