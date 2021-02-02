// miniprogram/pages/cart/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    showLoginPanel:false,
    cartIdSelectedResult:[],
    allIsSelected:false,
    editMode:false,
    carts:[],
    totalPrice:0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    // let res = await getApp().wxp.request4({
    //   url: 'http://localhost:3009/user/my/carts',
    //   method: 'get'
    // });
    // console.log(res);
    // if (res.data.msg == 'ok') {
    //   let carts = res.data.data;
    //   this.setData({
    //     carts
    //   });
    // }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: async function () {
    let res = await getApp().wxp.request4({
      url: 'http://localhost:3009/user/my/carts',
      method: 'get'
    });
    console.log(res);
    if (res.data.msg == 'ok') {
      let carts = res.data.data;
      this.setData({
        carts
      });
    }
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
  calcTotalPrice(){},
  changeEditMode(){
    let editMode = !this.data.editMode;
    this.setData({
      editMode
    });
  },
  onSelectGoodsItem(e){
    // console.log(e.detail);
    let cartIdSelectedResult = e.detail;
    this.setData({
      cartIdSelectedResult
    });
    this.calcTotalPrice();
  },
  onSelectAll(event){

  },
  onCartConfirm(e){
    // 拿到列表数据
  },
  async onCartGoodsNumChanged(e) {
    
  },
  async removeCartGoods(e){

  }
})