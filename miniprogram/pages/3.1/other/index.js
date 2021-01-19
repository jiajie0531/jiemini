// miniprogram/pages/3.1/other/index.js
import loginWithCallback from '../../../lib/login'

Page({

  /**
   * Page initial data
   */
  data: {

  },

  startLoginAndRequest4: function (e) {
    // 调用user/home接口
    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3009/user/home',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success(res) {
          if (res.errMsg === "request:ok") {
            console.log("/user/home res", res);
          }
        },
        fail(err) {
          if (err.errMsg === "request:fail") {
            console.log("/user/home err", err);
          }
        },
        complete(resOrErr) {
          console.log("/user/home resOrErr", resOrErr);
        }
      });
    }

    loginWithCallback(e, (token) => {
      requestUserHome(token);
    });
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