// miniprogram/pages/2.14/cut/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    src: '',
    width: 250, //宽度
    height: 250, //高度
  },
  startCuting: function(){
    // 获取到image-cropper对象
    this.cropper = this.selectComponent('#image-cropper');
    // 开始剪裁
    this.setData({
      src: "https://cdn.nlark.com/yuque/0/2020/jpeg/1252071/1590847767698-f511e86d-f183-4f75-a04d-1b99cd9f0bd7.jpeg"
    });
    wx.showLoading({
      title: '加载中',
    });
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.startCuting()
  },
  cropperload: function(e) {
    console.log("cropper初始化完成");
  },
  loadimage: function(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    // 重置图片角度、缩放、位置
    this.cropper.imgReset();
   },
   clickcut: function(e) {
     console.log(e.detail);
     console.log(e.detail.url);
     // 点击裁剪框阅览图片
     wx.previewImage({
       current: e.detail.url, // 当前显示图片的http链接
       urls: [e.detail.url],  // 需要预览的图片http链接列表
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

  }
})