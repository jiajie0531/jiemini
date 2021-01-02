// miniprogram/pages/2.6/index.js
var base64 = require("../../images/base64");
Page({

  /**
   * Page initial data
   */
  data: {
    x: 0,
    y: 0,
    scale: 2,
    // 当前x的值
    currentX: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      slideButtons: [{
        text: '普通1',
        src: '/images/icon_love.svg', // icon的路径
      },{
        text: '普通2',
        extClass: 'test',
        src: '/images/icon_star.svg', // icon的路径
      },{
        type: 'warn',
        text: '警示3',
        extClass: 'test',
          src: '/images/icon_del.svg', // icon的路径
      }],
    });
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
  onMovableViewChange: function(e) {
    console.log("change", e.detail);
  },
  tap: function(e) {
    let kind = parseInt(e.currentTarget.dataset.kind);
    if(!kind){
      this.setData({
        x: 30,
        y: 30
      });
    } else {
      this.setData({
        x: 0,
        y: 0
      });
    }
  },
  tap2: function(e) {
    let kind = parseInt(e.currentTarget.dataset.kind);
    if(!kind){
      this.setData({
        scale: 3 
      });
    } else {
      this.setData({
        scale: 0 
      });
    }
  },
  onChange: function(e) {
    console.log(e.detail);
  },
  onScale: function(e) {
    console.log(e.detail);
  }
})