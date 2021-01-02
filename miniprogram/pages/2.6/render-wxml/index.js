// miniprogram/pages/2.6/render-wxml/index.js
const { wxml, style } = require('./demo')

Page({

  /**
   * Page initial data
   */
  data: {
    src: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.widget = this.selectComponent('.widget');
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
  onTapSaveBtn: function(e){
    wx.saveImageToPhotosAlbum({
      filePath: this.data.src,
      complete(res){
        console.log(res);
      }
    });
  },
  renderToCanvas: function() {
    const p1 = this.widget.renderToCanvas({wxml, style})
    p1.then((res) => {
      console.log('container', res.layoutBox);
      this.container = res;
    });
  },
  extraImage: function(){
    const p2 = this.widget.canvasToTempFilePath();
    p2.then(res => {
      this.setData({
        src: res.tempFilePath,
        width: this.container.layoutBox.width,
        height: this.container.layoutBox.height
      });
    });
  },
})