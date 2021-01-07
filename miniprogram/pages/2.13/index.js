// miniprogram/pages/2.13/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    loading: false,
    active: true
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
  changeLoading: function(e){
    console.log(e);
  },
  // 点击back事件处理
  goBack: function(){
    wx.navigateBack();
    this.triggerEvent('back');
  },
  // 返回首页
  goHome: function(){
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
  onPageScroll: function(res) {
    console.log(res);
    if (res.scrollTop > 400) {
      if (!this.data.active) {
        this.setData({
          active: true
        });
      }
    } else {
      if (this.data.active) {
        this.setData({
          active: false
        });
      }
    }
  }
})