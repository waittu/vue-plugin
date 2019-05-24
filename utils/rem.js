const baseSize = 32;
function setRem (){
    const scale = document.documentElement.clientWidth/750
    document.documentElement.style.fontSize = (baseSize*Math.min(scale,2))+'px'
}
setRem()
window.onresize = function(){
    setRem();
    pageInput()
}
// H5页面弹出的键盘遮盖文本框
function pageInput(){
    if(document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
        document.activeElement.scrollIntoViewIfNeeded();
    }

}