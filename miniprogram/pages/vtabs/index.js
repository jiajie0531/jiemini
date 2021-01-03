// miniprogram/pages/vtabs/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    vtabs: [],
    activeTab: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const titles = ['热搜推荐', '手机数码', '家用电器',
    '生鲜果蔬', '酒水饮料', '生活美食', 
    '美妆护肤', '个护清洁', '女装内衣', 
    '男装内衣', '鞋靴箱包', '运动户外', 
    '生活充值', '母婴童装', '玩具乐器', 
    '家居建材', '计生情趣', '医药保健', 
    '时尚钟表', '珠宝饰品', '礼品鲜花', 
    '图书音像', '房产', '电脑办公']
    const vtabs = titles.map(item => ({title: item}))
    this.setData({vtabs});
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
  onTabCLick: function(e) {
    const index = e.detail.index;
    console.log('tabClick', index);
  },
  bindchange: function(e) {
    const index = e.detail.index;
    console.log('change', index);
  }
})