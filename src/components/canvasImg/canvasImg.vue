<template>
    <div class="canvas">
        <canvas id="canvas" class="canvas-warp"></canvas>
        <a class="download" id="download">保持图片</a>
    </div>
</template>
<script>
import imgSrc from "../../assets/image/ma.png"
export default {
    name:"canvasPage",
    data() {
        return {
            
        }
    },
    mounted(){
        this.initCanvas()
    },
    methods:{
        initCanvas(){
            const clientWidth =  document.body.clientWidth;
            const canvas = document.getElementById('canvas')
            canvas.width = clientWidth;
            canvas.height = document.body.clientHeight-100;
            const ctx = canvas.getContext('2d');
            // 添加背景图片
            const IMG = new Image()
            IMG.src = imgSrc;
            IMG.onload = ()=> {
                ctx.drawImage( IMG,0,0,clientWidth,clientWidth);
                // 添加文字
                ctx.fillStyle = "#000"
                ctx.font = "30px 微软雅黑" 
                ctx.textAlign="center";    
                ctx.fillText("我们不一样", clientWidth/2, clientWidth+50);
                let textString ="云想衣裳花想容，春风拂槛露华浓若非群玉山头见，会向瑶台月下逢"
                // 换行文字
                this.drawText(ctx,textString,clientWidth/2,clientWidth+60,300)
                const downloadEl = document.getElementById('download')
                downloadEl.href = canvas.toDataURL("image/png");
                downloadEl.download = '我们不一样'
            }
        },
        // 换行
        
        drawText(context,texts,x,y,rowWidth){
            let textArr = texts.split("");
            let textItem = "";// 每行展示多少字              
            let textRow = []; //多少行
            context.font = "20px 微软雅黑";
            context.fillStyle = "black";
            context.textBaseline = "middle";
            for(let i = 0; i < textArr.length; i++){
                // 判断当前一行能有显示多少字
                if(context.measureText(textItem).width < rowWidth && context.measureText(textItem+(textArr[i])).width <= rowWidth){
                    textItem += textArr[i];
                }else{
                    textRow.push(textItem);
                    textItem = textArr[i];
                }
            }
            textRow.push(textItem);
            for(let i = 0; i < textRow.length; i++){
                context.fillText(textRow[i],x,y+(i+1)*36);//字体20，间隔36。类似行高
            }
        }
        
    }
}
</script>
<style lang="less" scoped>
.canvas-warp{
    display: block;
    background-color: #fff;
}
.download{
    display: block;
    width: 200px;
    height: 80px;
    margin: 40px auto;
    background-color: #2878ff;
    border-radius: 40px;
    text-align: center;
    line-height: 80px;
    color: #fff;
}
</style>

