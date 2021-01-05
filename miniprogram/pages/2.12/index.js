// miniprogram/pages/2.12/index.js
var pageData = {}
for (let i = 0; i < 5; ++i) {
  (function (index) {
    pageData[`slider${index}change`] = function (e) {
      console.log(`slider${index}发生change事件，携带值为`, e.detail.value);
    }
  })(i); 
}
Page({

  /**
   * Page initial data
   */
  data: {

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
  onSliderChanging: function(e) {
    console.log(e.type, e.detail.value);
  },
  slider1change: function(e) {
    console.log("change:", e);
  },
  slider1changing: function(e) {
    console.log("changing:", e);
  },
  slider2change: function(e) {
    console.log("changing:", e);
  },
  slider3change: function(e) {
    console.log("changing:", e);
  },
  slider4change: function(e) {
    console.log("changing:", e);
  }
})