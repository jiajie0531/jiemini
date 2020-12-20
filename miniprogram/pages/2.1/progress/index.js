// miniprogram/pages/2.1/progress/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    percentValue: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

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
  }
})