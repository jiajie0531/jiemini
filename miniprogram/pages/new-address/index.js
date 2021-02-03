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
  async save(e){
    // let data = this.data;
    // console.log(data);
    let userName = this.data.userName;
    let telNumber = this.data.telNumber;
    let detailInfo = this.data.detailInfo;
    let region = this.data.region;
    let id = this.data.id;

    if (!userName || !telNumber || !detailInfo) {
      wx.showModal({
        title: '数据项不能为空',
      })
      return
    }
    if (!/[\d-]{11,18}/.test(telNumber)){
      wx.showModal({
        title: '电话格式对吗？',
      })
      return
    }
    let data = {
      userName,
      telNumber,
      detailInfo,
      region,
      id
    }
    let method = id ? 'put' : 'post';
    let res = await wx.wxp.request4({
      url: 'http://localhost:3009/user/my/address',
      method,
      data
    });
    if (res.data.msg == 'ok') {
      let opener = this.getOpenerEventChannel();
      let address = this.data
      if (!id) {
        address.id = res.data.data.id;
      }
      opener.emit("savedNewAddress", address);
      wx.navigateBack({
        delta: 1,
      })
    } else {
      wx.showModal({
        title: '添加失败，是否电话重复了？',
      })
    }
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
  }
})