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
    // 拉取sku规格数据
    let goodsSkuDataRes = await wx.wxp.request({
      url: `http://localhost:3009/goods/goods/${goodsId}/sku`,
    });
    // console.log(goodsSkuDataRes);
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

  },
  onTapSkuTag(e){
    // 获取设置选择的规格
    let attrvalue = e.currentTarget.dataset.attrvalue;
    let attrKey = e.currentTarget.dataset.attrkey;

    console.log('attrvalueid', attrvalue, attrKey);
    let selectedAttrValue = this.data.selectedAttrValue;
    selectedAttrValue[attrKey] = attrvalue;
    this.setData({
      selectedAttrValue
    });
    // 计算价格及库存
    let totalIdValue = 0;
    let goodsAttrKeys = this.data.goodsSkuData.goodsAttrKeys;
    for (let j = 0; j < goodsAttrKeys.length; j++) {
      let attrKey = goodsAttrKeys[j].attr_key;
      if (selectedAttrValue[attrKey]) {
        totalIdValue += selectedAttrValue[attrKey].id
      }
    }
    console.log("totalIdValue", totalIdValue);

    let goodsSku = this.data.goodsSkuData.goodsSku;
    let tempTotalIdValue = 0;

    for (let j = 0; j < goodsSku.length; j++) {
      let goodsAttrPath = goodsSku[j].goods_attr_path;
      if (goodsAttrPath.length != goodsAttrKeys.length) {
        break;
      }
      tempTotalIdValue = 0;
      goodsAttrPath.forEach(item=>tempTotalIdValue += item);
      console.log("temTotalIdValue",tempTotalIdValue);

      if (tempTotalIdValue == totalIdValue) {
        let selectedGoodsSku = goodsSku[j];
        this.setData({
          selectedGoodsSku
        })
        break;
      }
    }
  },
  /**
   * 确定选择当前规格
   */
  onConfirmGoodsSku(){
    let goodsSkuData = this.data.goodsSkuData;
    let selectedGoodsSkuObject = this.data.selectedGoodsSkuObject;
    selectedGoodsSkuObject.sku = Object.assign({}, this.data.selectedGoodsSku);
    selectedGoodsSkuObject.text = '';
    for (let j = 0; j < goodsSkuData.goodsAttrKeys.length; j++) {
      let item = goodsSkuData.goodsAttrKeys[j];
      if (!this.data.selectedAttrValue[item.attr_key]) {
        wx.showModal({
          title: '没有选择全部规格',
          showCancel:false
        })
        return
      }
      selectedGoodsSkuObject.text += this.data.selectedAttrValue[item.attr_key].attr_value + ' '
    }
    this.setData({
      selectedGoodsSkuObject,
      showSkuPanel:false
    });
  },
  async addToCart(e){
    if (!this.data.selectedGoodsSkuObject.sku) {
      wx.showModal({
        title: '请选择商品规格',
        showCancel: false
      });
      this.showSkuPanelPopup();
      return;
    }
    let goods_id = this.data.goodsId;
    let goods_sku_id = this.data.selectedGoodsSkuObject.sku.id;
    let goods_sku_desc = this.data.selectedGoodsSkuObject.text;
    let data = {
      goods_id,
      goods_sku_id,
      goods_sku_desc
    }
    let res = await getApp().wxp.request4({
      url:'http://localhost:3009/user/my/carts',
      method:'post',
      data
    });
    if (res.data.msg == 'ok') {
      wx.showToast({
        title: '已添加',
      })
    }
  },
  /**
   * 显示规格面板
   */
  showSkuPanelPopup(){
    this.setData({
      showSkuPanel:true
    });
  },
  /**
   * 关闭规格面板
   */
  onCloseSkuPanel(){
    this.setData({
      showSkuPanel:false
    });
  },
  /**
   * 测试返回对象
   * @param {*} e 
   */
  requestHomeApiByReq4(e){
    getApp().wxp.request4({
      url: 'http://localhost:3009/user/home',
      onReturnObject(rtn){
        rtn.abort()
      }
    }).catch(err=>{
      console.log(err);
    });
  }
})