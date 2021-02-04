// miniprogram/pages/confirm-order/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    carts:[],
    userMessage:'',
    totalPrice:0,
    address:{
      userName:'选择'
    },
    submchPayParams: {}, 
    submchPayorderResult:{},
    prepareSubmchPay: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('cartData', (res) => {
      console.log(res);
      this.setData({
        carts:res.data
      });
      this.calcTotalPrice();
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
  onSubmit(e){
    wx.showActionSheet({
      itemList: ['默认支付', '小微商户'],
      success:(res)=>{
        console.log(res.tapIndex);
        let index = res.tapIndex;
        if (index == 0) { // 默认支付
          this.startNormalPay(e);
        } else if (index == 1) { // 小微商户
          this.startSubmchPay(e)
        }
      },
      fail(res){
        console.log(res.errMsg)
      }
    });
  },
  async startNormalPay(e){},
  async startSubmchPay(e){},
  /**
   * 准备跳转到地址列表，选取地址
   */
  toSelectAddress(){
    wx.navigateTo({
      url: '/pages/address-list/index',
      success:res=>{
        res.eventChannel.on('selectAddress', address=>{
          address.addressInfo = address.region.join('')+address.detailInfo;
          this.setData({
            address
          });
        });
      }
    });
  },
  /**
   * 重新计算总价
   */
  calcTotalPrice(){
    let totalPrice = 0;
    let carts = this.data.carts;
    carts.forEach(item=>{
      totalPrice += item.price * item.num
    });
    this.setData({
      totalPrice
    });
  }
})