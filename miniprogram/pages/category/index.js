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
        this.getGoodsListByCategory(item.id, j);
      }
      // this.getGoodsListByCategory(item.id);
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
  async onTapGoods(e) {
    wx.showLoading({
      title: 'Loading...',
    });
    let goodsId = e.currentTarget.dataset.id;
    // console.log("e.currentTarget.dataset.id is ", goodsId);
    let goods = await wx.wxp.request({
      url: `http://localhost:3009/goods/goods/${goodsId}`,
    });
    console.log(goods);
    if (goods) {
      goods = goods.data.data
      wx.navigateTo({
        url: `/pages/goods/index?goodsId=${goodsId}`,
        success: function(res) {
          res.eventChannel.emit('goodsData', {data: goods})
        }
      })
    }
    wx.hideLoading();
  },
  /**
   * 重新计算高度
   * @param {*} index 
   */
  reClacChildHeight(index) {
    // calcChildHeight
    const goodsContent = this.selectComponent(`#goods-content${index}`);
    console.log(goodsContent);

    const categoryVtabs = this.selectComponent('#category-vtabs');
    // categoryVtabs.calcChildHeight(goodsContent);
  },
  async getGoodsListByCategory(categoryId, index, loadNextPage = false){
    console.log(categoryId, index, loadNextPage);

    const pageSize = 30;
    let pageIndex = 1;
    let listMap = this.data.goodsListMap[categoryId];
    // console.log(listMap);
    
    if (listMap) {
      console.log(listMap.count);

      // 加载完了，就不要重复加载了
      if (listMap.rows.length >= listMap.count) {
        return;
      }
      if (listMap.pageIndex) {
        pageIndex = listMap.pageIndex;
        if (loadNextPage) {
          pageIndex++;
        }
      }
    }
    let goodsData = await wx.wxp.request({
      url: `http://localhost:3009/goods/goods?page_index=${pageIndex}&page_size=${pageSize}&category_id=${categoryId}`,
    });
    if (goodsData) {
      goodsData = goodsData.data.data;
    }
    console.log(goodsData);
    if (listMap) {
      listMap.pageIndex = pageIndex;
      listMap.count = goodsData.count;
      listMap.rows.push(...goodsData.rows);
      // console.log(listMap);
      
      this.setData({
        [`goodsListMap[${categoryId}]`]:listMap
      });
    } else {
      goodsData.pageIndex = pageIndex;
      this.setData({
        [`goodsListMap[${categoryId}]`]:goodsData
      });
    }

    this.data.goodsListMap[categoryId] = goodsData;
    this.reClacChildHeight(index);
  },
  onScrollToIndexLower(e){
    console.log("scroll to index lower", e.detail);
    let index = e.detail.index;
    // 这是一个多发事件
    if (index != this.data.lastIndexForLoadMore) {
      let cate = this.data.vtabs[index];
      let categoryId = cate.id;
      this.getGoodsListByCategory(categoryId, index, true);
      this.data.lastIndexForLoadMore = index;
    }
  },
  onCategoryChanged(index){
    let cate = this.data.vtabs[index];
    let category_id = cate.id;
    if (!this.data.goodsListMap[category_id]) {
      this.getGoodsListByCategory(category_id, index);
    }
  },
  onTabCLick(e){
    const index = e.detail.index;
    console.log('tabClick', index);
    this.onCategoryChanged(index);
  },
  onChange(e){
    const index = e.detail.index;
    console.log('change', index);
    this.onCategoryChanged(index);
  }
})