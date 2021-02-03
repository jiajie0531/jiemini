// miniprogram/pages/new-address/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    id:0,
    userName:'',
    telNumber:'',
    region: ['广东省', '广州市', '海珠区'],
    detailInfo:''
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
    let opener = this.getOpenerEventChannel();
    opener.on("editAddress", address => {
      this.setData({
        userName:address.userName,
        telNumber:address.telNumber,
        detailInfo:address.detailInfo,
        region:address.region,
        id:address.id
      });
    });
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
  async save(e){},
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
  }
})