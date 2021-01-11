// miniprogram/pages/2.14/index.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    appear: false,
    qrcode: 'https://cdn.nlark.com/yuque/0/2020/jpeg/1252071/1590847767698-f511e86d-f183-4f75-a04d-1b99cd9f0bd7.jpeg'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://wxapi.kkgoo.cn/live/discover?type=hot',
      method: 'POST',
      success: (res) => {
        this.setDis(res);
      }
    });
  },
  setDis: function (r) {
    let newData = r.data.data;
    this.data.nextKey = newData.nextKey ? newData.nextKey : this.data.nextKey;
    this.setData({
      content: newData.discover ? newData.discover : this.data.content,
      banneritem: newData.cards ? newData.cards.slice(0, newData.cards.length -1) : this.data.banneritem
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
  gotoLive: function(e) {
    console.log(e);
  }
})