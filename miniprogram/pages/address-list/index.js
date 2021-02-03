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
  onLoad: async function (options) {
    let res = await wx.wxp.request4({
      url: 'http://localhost:3009/user/my/address',
      method:'get'
    });
    let addressList = res.data.data;
    let selectedAddressId = addressList[0].id;
    this.setData({
      addressList,
      selectedAddressId
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
  async onSlideButtonTap(e) {
    // e.detail.index是选择按钮的序号
    console.log(e.detail.index);
    let id = e.currentTarget.dataset.id;
    console.log('slide button tap', e.detail, id);

    let res = await wx.wxp.request4({
      url: `http://localhost:3009/user/my/address/${id}`,
      method: 'delete'
    });
    console.log(res);
    if (res && res.data.msg == 'ok') {
      // 处理本地数据
      let addressList = this.data.addressList;
      for (let j = 0; j < addressList.length; j++) {
        if (addressList[j].id == id) {
          addressList.splice(j, 1);
          break;
        } 
      }
      this.setData({
        addressList
      });
    }
  },
  getAddressFromWeixin(e){
    if (wx.canIUse('chooseAddress.success.userName')) {
      wx.chooseAddress({
        success: async (res) => {
          console.log(res);
          let addressList = this.data.addressList;

          let addressContained = addressList.find(item => item.telNumber == res.telNumber);
          if (addressContained) {
            this.setData({
              selectedAddressId: addressContained.id
            });
            return
          }

          let data = {
            // id: addressList.length,
            userName: res.userName,
            telNumber: res.telNumber,
            region: [res.provinceName, res.cityName, res.countyName],
            detailInfo: res.detailInfo
          }
          let res1 = await wx.wxp.request4({
            url: 'http://localhost:3009/user/my/address',
            method:'post',
            data
          });
          console.log(res1);
          if (res1.data.msg == 'ok') {
            let item = res1.data.data;
            addressList.push(item);
            this.setData({
              addressList,
              selectedAddressId:item.id
            });
          } else {
            wx.showToast({
              title: '添加不成功，是不是添加过了？',
            })
          }
        },
      });
    }
  },
  confirm(e){
    let selectedAddressId = this.data.selectedAddressId;
    let addressList = this.data.addressList;
    let item = addressList.find(item=>item.id == selectedAddressId);
    let opener = this.getOpenerEventChannel();
    opener.emit('selectAddress', item);
    wx.navigateBack({
      delta: 1,
    });
  },
  /**
   * 编辑回来回调这个方法
   * @param {*} address 
   */
  onSavedAddress(address){
    console.log(address);
    let addressList = this.data.addressList;
    let hasExist = addressList.some((item,index)=>{
      if (item.id == address.id) {
        addressList[index] = address 
        return true
      }
      return false;
    });
    if (!hasExist) {
      addressList.push(address);
    }

    this.setData({
      addressList,
      selectedAddressId: address.id
    });
  },
  navigateToNewAddressPage(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/new-address/index',
      success:(res)=>{
        res.eventChannel.on("savedNewAddress", this.onSavedAddress)
      }
    });
  },
  onChange(event){
    this.setData({
      selectedAddressId: event.detail,
    });
  },
  edit(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let addressList = this.data.addressList;
    let address = addressList.find(item=>item.id == id);
    wx.navigateTo({
      url: '/pages/new-address/index',
      success:(res)=>{
        res.eventChannel.emit('editAddress', address);
        res.eventChannel.on('savedNewAddress', this.onSavedAddress);
      }
    })
  }
})