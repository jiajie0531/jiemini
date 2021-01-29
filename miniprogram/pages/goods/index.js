// miniprogram/pages/goods/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    showLoginPanel:false,
    showSkuPanel: false,
    goodsId:0,
    goodsData:{},
    goodsImages: [],
    goodsContentInfo:{},
    goodsSkuData:{},
    selectedGoodsSku:{},
    selectedAttrValue:{},
    selectedGoodsSkuObject:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    let goodsId = options.goodsId;
    this.data.goodsId = goodsId;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('goodsData', (res) => {
      console.log(res);
      let goodsImages = res.data.goods_infos.filter(item=>(item.kind == 0));
      let goodsContentInfo = res.data.goods_infos.filter(item=>(item.kind == 1))[0];

      this.setData({
        goodsData:res.data,
        goodsImages,
        goodsContentInfo
      });
    });
    // 拉去sku规格数据
    let goodsSkuDataRes = await wx.wxp.request({
      url: `http://localhost:3009/goods/goods/${goodsId}/sku`,
    });
    console.log(goodsSkuDataRes);
    if (goodsSkuDataRes) {
      let goodsSkuData = goodsSkuDataRes.data.data;
      this.setData({
        goodsSkuData
      });
    }
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