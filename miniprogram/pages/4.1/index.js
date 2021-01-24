// miniprogram/pages/4.1/index.js
import area from '../../lib/area'

Page({

  /**
   * Page initial data
   */
  data: {
    areaList:area,
    show:false,
    progress:1
  },
  incressProgress(e){
    let progress = this.data.progress;
    progress += 20;
    console.log("progress", progress);
    progress = Math.min(100, progress);
    this.setData({
      progress:progress
    });
  },
  onClose(e){
    this.setData({show:false});
  },
  onTap(e){
    this.setData({
      show:true
    })
  },
  onAreaConfirm(e){
    console.log(e.detail);
    this.onClose();
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

  }
})