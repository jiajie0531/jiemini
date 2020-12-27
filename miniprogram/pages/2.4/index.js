// miniprogram/pages/2.4/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    nickName: '',
    avatarUrl: '',
    isCanDraw: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      nickName: wx.getStorageSync('nickName') || '',
      avatarUrl: wx.getStorageSync('avatarUrl') || ''
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
  getUserInfo: function(e){
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    });
    wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
    wx.setStorageSync('nickName', e.detail.userInfo.nickName);
  },
  createShareImage: function(e){
    this.setData({
      isCanDraw: !this.data.isCanDraw
    });
  },
  // example-4
  onTap: function(e){
    console.log(e.target);
  }
})
