// miniprogram/pages/2.8/index.js
const app = getApp();
let viewId = 5;
const createRecycleContext = require('miniprogram-recycle-view')
function rpx2px(rpx) {
  return (rpx / 750) * wx.getSystemInfoSync().windowWidth
}

Page({

  /**
   * Page initial data
   */
  data: {
    arr: [],
    triggered: false,
    scrollTopValue: 0,
    scrollIntoViewId: '',
    pullingMessage: '下拉刷新', // 下拉刷新，释放更新，加载中...
    refresherTriggered: false,
    tabs:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    var ctx = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: {
        width: rpx2px(650),
        height: rpx2px(100)
      }
    });
    let newList = [];
    for(let i = 0; i < 20; i++){
      newList.push({
        id: i,
        name: `标题${i + 1}`
      });
    }
    ctx.append(newList);
    //
    const arr = [];
    for(let i = 0; i < 20; i++){
      arr.push(i);
    }
    this.setData({
      arr
    });
    setTimeout(() => {
      this.setData({
        triggered: true,
      });
    }, 1000);
    //
    let activeTab = 0, page = 1, res = {something: ''};
    let tabsData = this.data.tabs[activeTab] || {list:[]};
    tabsData.page = page+1;
    tabsData.list.push(res);
    let key = `tabs[${activeTab}]`;
    this.setData({
      [key]: tabsData
    });
    console.log(this.data.tabs);
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
  willCompleteRefresh: function(){
    console.log('更新中');
    let intervalId = setInterval(()=>{
      let pullingMessage = this.data.pullingMessage;
      console.log(pullingMessage, pullingMessage == '更新中');
      if (pullingMessage.length < 7) {
        pullingMessage += '.'
      } else {
        pullingMessage = '更新中'
      }
      this.setData({
        pullingMessage
      });
    },500);
    setTimeout(()=>{
      console.log('更新完成了');
      clearInterval(intervalId);
      this.setData({
        pullingMessage:"已刷新",
        refresherTriggered:false,
      });
    },2000);
  },
  onPulling: function(e) {
    console.log('onPulling:', e);
  },
  onRefresh: function() {
    if (this._freshing) return;
    this._freshing = true;
    setTimeout(() => {
      this.setData({
        triggered: false,
      });
      this._freshing = false;
    }, 3000);
  },
  onRestore: function(e) {
    console.log('onRestore:', e);
  },
  onAbort: function(e) {
    console.log('onAbort', e);
  },
  unshiftOnePic: function() {
    let arr = this.data.arr;
    arr.unshift(arr.length+1);
    this.setData({
      arr
    });
  },
  scrollToView1: function() {
    viewId += 2;
    this.setData({
      scrollIntoViewId:'childview'+viewId
    });
    console.log(this.data.scrollIntoViewId);
  },
  onScroll: function(e) {
    console.log(e.detail.scrollTop, e.detail.scrollLeft, e.detail.scrollHeight, e.detail.scrollWidth);
  },
  onScrolltoupper: function(e) {
    console.log('已到达顶部后，小于50， 是一种状态');
  },
  plusScrollUpValue: function() {
    this.setData({
      scrollTopValue: this.data.scrollTopValue+50
    })
  },
  viewScrollToUpperEvent: function(e) {
    console.log('测试scrolltoupper事件', e.detail);
  }
})