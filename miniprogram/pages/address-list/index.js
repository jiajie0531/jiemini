// miniprogram/pages/address-list/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    radio: 0,
    selectedAddressId: 0,
    addressList: [],
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }]
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
  getAddressFromWeixin(e){},
  confirm(e){},
  /**
   * 编辑回来回调这个方法
   * @param {*} address 
   */
  onSavedAddress(address){
    console.log(address);
  },
  navigateToNewAddressPage(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/new-address/index',
      success:(res)=>{
        res.eventChannel.on("savedNewAddress", this.onSavedAddress)
      }
    });
  }
})