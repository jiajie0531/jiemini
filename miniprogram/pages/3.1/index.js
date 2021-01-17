// miniprogram/pages/3.1/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    showLoginPanel:false,
    showLoginPanel2:false
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
  /**
   * 3.1 测试一个网络请求，及返回
   */
  startOneRequest: function(){
    // 正常
    wx.request({
      url: 'http://localhost:3000/hi',
      success(res){
        if (res.errMsg === "request:ok") {
          console.log("res1", res);
        }
      },
      fail(err){
        if (err.errMsg === "request:fail") {
          console.log("err1", err);
        }
      },
      complete(resOrErr){
        console.log("resOrErr1", resOrErr);
      }
    });

    // 错误
    wx.request({
      url: 'http://localhost:3000/err',
      success(res){
        if (res.errMsg === "request:ok") {
          console.log("res2", res);
        }
      },
      fail(err){
        if (err.errMsg === "request:fail") {
          console.log("err2", err);
        }
      },
      complete(resOrErr){
        console.log("resOrErr2", resOrErr);
      }
    });

    // 取消
    let reqTask = wx.request({
      url: 'http://localhost:3000/err',
      success(res){
        if (res.errMsg === "request:ok") {
          console.log("res3", res);
        }
      },
      fail(err){
        if (err.errMsg === "request:fail") {
          console.log("err3", err);
        }
      },
      complete(resOrErr){
        // 被取消时，也会被调用
        console.log("resOrErr3", resOrErr);
      }
    });
  }
})