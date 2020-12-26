// miniprogram/pages/2.1/progress/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    percentValue: 0
  },
  onTapProgressBar: function(e) {
    console.log(e);
    let progress = this.data.percentValue;
    if(progress < 100){
      progress += 5;
      this.setData({percentValue:Math.min(100,progress)});
    }
  },
  onProgressActiveEnd: function(e) {
    console.log(e);
  },
  // 已经加载完的进度条progress，怎么点击某个按钮让它重新加载呢？
  onTapReloadBtn: function(e){
    this.setData({percentValue:0});
    this.setData({percentValue:50});
  },
  // 7 环形进度条
  drawProgress(){
    console.log('drawProgress()...' + this.data.percentValue);
    if(this.data.percentValue >= 100){
      this.setData({
        percentValue:0
      });
    }
    this.setData({
      percentValue: this.data.percentValue+10
    });
    console.log(' ' + this.data.percentValue);
  }
})