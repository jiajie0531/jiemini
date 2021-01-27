// miniprogram/pages/category/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    vtabs: [],
    activeTab: 0,
    goodsListMap:{},
    loading:true,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    let categories = await wx.wxp.request({
      url: "http://localhost:3009/goods/categories"
    });
    console.log(categories);

    if (categories) {
      categories = categories.data.data;
    }

    let vtabs = [];
    for (let j = 0; j < categories.length; j++) {
      let item = categories[j];
      if (j<3) {
        // 
      }
      vtabs.push({title: item.category_name, id: item.id});
    }

    this.setData({
      vtabs,
      loading: false
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
  async getGoodsListByCategory(categoryId, index, loadNextPage = false){
    const pageSize = 10;
    let pageIndex = 1;
    let listMap = this.data.goodsListMap[categoryId];
  }
})