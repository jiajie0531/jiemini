// miniprogram/pages/3.1/index.js
import loginWithCallback from '../../lib/login'

Page({

  /**
   * Page initial data
   */
  data: {
    showLoginPanel:false,
    showLoginPanel2:false
  },
  // 3.9
  async testRequest3(e){
    const app = getApp();
    // 一个需要鉴权的接口
    let res3 = await app.wxp.request2({
      url: 'http://localhost:3009/user/home'
    });
    if (res3) {
      console.log('res3', res3);
    }

    // 使用request3
    let res4 = await app.wxp.request3({
      url: 'http://localhost:3009/user/home'
    });
    if (res4) {
      console.log('res4', res4);
    }
  },
  // 3.8
  testEvent: function(e){
    const ge = getApp().globalEvent;
    function func1(a,b){
      console.log("a+b", a+b);
      return a+b;
    }
    ge.on("event1", func1);
    ge.emit("event1", 1, 2);
    ge.off("event1");
    ge.emit("event1",1,2);
  },
  // 3.7 
  async requestHomeApi(e) {
    const app = getApp();
    // 普通接口
    let res1 = await app.wxp.getSystemInfo();
    if (res1) {
      console.log(res1);
    }
    // Uncaught (in promise) thirdScriptError
    // 使用request2
    let res2 = await app.wxp.request2({
      url: 'http://localhost:3009/hi',
    });
    if (res2) {
      console.log(res2);
    }

    // 一个需要鉴权的接口
    let res3 = await app.wxp.request2({
      url: 'http://localhost:3009/user/home'
    });
    if (res3) {
      console.log('res3', res3);
    }

    // 使用request3
    let res4 = await app.wxp.request3({
      url: 'http://localhost:3009/user/home'
    });
    if (res4) {
      console.log('res4', res4);
    }
  },
  // 3.7 请求接口by req4 & 3.9 测试返回对象
  requestHomeApiByReq4: function(e) {
    getApp().wxp.request4({
      url:  'http://localhost:3009/user/home',
      onReturnObject(rtn){
        rtn.abort()
      }
    }).catch(err => {
      console.log(err);
    });
  },
  showLoginPanel: function(e){
    this.setData({
      showLoginPanel:true
    });
  },
  showLoginPanel2: function(e) {
    this.setData({
      showLoginPanel2: true
    });
  },
  // 3.6
  async requestOneHomeApi(e) {
    let res3 = await getApp().wxp.request2({
      url: 'http://localhost:3009/user/home',
    });
    if (res3) {
      console.log('res', res3);
    }
  },
  // 3.5
  startLoginAndRequestWithPromise: function(e) {
    // 调用user/home接口
    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3009/user/home?name=ly',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success(res) {
          if (res.errMsg === "request:ok") console.log("/user/home res", res)
        },
        fail(err) {
          if (err.errMsg === "request:fail") console.log("/user/home err", err)
        },
        complete(resOrErr) {
          console.log("/user/home resOrErr", resOrErr)
        }
      });
    }

    loginWithCallback(e).then((token) => {
      requestUserHome(token);
    });
  },
  // 3.5 
  async startLoginAndRequestWithPromise2(e) {
    // 调用user/home接口
    let token = await loginWithCallback(e);
    let res = await getApp().wxp.request({
      url: 'http://localhost:3009/user/home?name=ly',
      header: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(err => {
      console.log('err', err);
    });
    console.log('res', res);
  },
  // 3.5 
  async startLoginAndRequestWithPromise3(e) {
    // 调用user/home接口
    let token = await loginWithCallback(e);
    let res = await getApp().wxp.request2({
      url: 'http://localhost:3009/user/home?name=ly'
    });
    console.log('res', res);
  },
  /**
   * 3.4 any
   * @param {*} e 
   */
  any: function(e) {
    const app = getApp();
    let promise1 = app.wxp.request({url: 'http://localhost:3009/'}).catch(err => {
      console.log(err);
      throw err;
    });
    let promise2 = app.wxp.request({url: 'http://localhost:3009/hi'}).catch(err => {
      console.log(err); 
    });
    let promise3 = app.wxp.request({url: 'http://localhost:3009/home'}).catch(err => {
      console.log(err); 
    });
    let promise = Promise.any([promise1,promise2,promise3]);
    promise.then(res => {
      console.log('any promise res', res);
    },err => {
      console.log('any promise err', err);
    });
  },
  all: function(e) {
    const app = getApp();
    let promise1 = app.wxp.request({url: 'http://localhost:3009/'}).catch(err => {
      console.log(err);
      throw err;
    });
    let promise2 = app.wxp.request({url: 'http://localhost:3009/hi'}).catch(err => {
      console.log(err); 
    });
    let promise3 = app.wxp.request({url: 'http://localhost:3009/home'}).catch(err => {
      console.log(err); 
    });
    let promise = Promise.all([promise1,promise2,promise3]);
    promise.then(res => {
      console.log('all promise res', res);
    },err => {
      console.log('all promise err', err);
    });
  },
  race: function(e) {
    const app = getApp();
    let promise1 = app.wxp.request({url: 'http://localhost:3009/'}).catch(err => {
      console.log(err);
      throw err;
    });
    let promise2 = app.wxp.request({url: 'http://localhost:3009/hi'}).catch(err => {
      console.log(err); 
    });
    let promise3 = app.wxp.request({url: 'http://localhost:3009/home'}).catch(err => {
      console.log(err); 
    });
    let promise = Promise.race([promise1,promise2,promise3]);
    promise.then(res => {
      console.log('race promise res', res);
    },err => {
      console.log('race promise err', err);
    });
  },
  /**
   * 3.1 测试一个网络请求，及返回
   */
  startOneRequest: function(){
    // 正常
    wx.request({
      url: 'http://localhost:3009/hi',
      success(res){
        if (res.errMsg === "request:ok") {
          console.log("res1", res);
        }
      },
      fail(err){
        if (err.errMsg === "request:fail") {
          console.log("err1", err);
        }
      },
      complete(resOrErr){
        console.log("resOrErr1", resOrErr);
      }
    });

    // 错误
    wx.request({
      url: 'http://localhost:3009/err',
      success(res){
        if (res.errMsg === "request:ok") {
          console.log("res2", res);
        }
      },
      fail(err){
        if (err.errMsg === "request:fail") {
          console.log("err2", err);
        }
      },
      complete(resOrErr){
        console.log("resOrErr2", resOrErr);
      }
    });

    // 取消
    let reqTask = wx.request({
      url: 'http://localhost:3009/err',
      success(res){
        if (res.errMsg === "request:ok") {
          console.log("res3", res);
        }
      },
      fail(err){
        if (err.errMsg === "request:fail") {
          console.log("err3", err);
        }
      },
      complete(resOrErr){
        // 被取消时，也会被调用
        console.log("resOrErr3", resOrErr);
      }
    });
    const headersReceivedCallback = function(headers){
      // "use strict"
      reqTask.offHeadersReceived(headersReceivedCallback);
      console.log('headers', headers);
      // Procted resource = 18 chars
      // 能拿到这个长度，可能数据已经返回了，可以基于其他逻辑实施abort
      if (~~headers.header['Content-Length'] < 19) {
        reqTask.abort();
      }
      reqTask.onHeadersReceived(headersReceivedCallback);
      // reqTask.abort()
    }
  },
  /**
   * 登录之后，发起网络请求1
   * @param {*} e 
   */
  startLoginAndRequest3: function(e) {
    // 调用 user/home 接口
    const requestUserHome = (token) => {
      wx.request({
        url: 'http://localhost:3009/user/home',
        header: {
          'Authorization': `Bearer ${token}`
        },
        success(res) {
          if (res.errMsg === "request:ok") {
            console.log("/user/home res", res);
          }
        },
        fail(err) {
          if (err.errMsg === "request:fail") {
            console.log("/user/home err", err);
          }
        },
        complete(resOrErr) {
          console.log("/user/home resOrErr", resOrErr);
        }
      })
    }

    this.loginWithCallback(e, (token) => {
      requestUserHome(token)
    })
  },
  /**
   * 带有回调的登录方法
   * @param {*} e 
   * @param {*} cb 
   */
  loginWithCallback: function(e, cb) {
    let {
      userInfo,
      encryptedData,
      iv
    } = e.detail;
    console.log('userInfo', userInfo);

    const requestLoginApi = (code) => {
      // 发起网络请求
      wx.request({
        url: 'http://localhost:3000/user/wexin-login2',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          code: code,
          userInfo,
          encryptedData,
          iv
        }, 
        success(res) {
          console.log('请求成功', res.data);
          let token = res.data.data.authorizationToken;
          wx.setStorageSync('token', token);
          onUserLogin(token);
          console.log('authorization', token);
        },
        fail (err) {
          console.log('请求异常', err);
        }
      })
    }

    const onUserLogin = (token) => {
      getApp().globalData.token = token;
      wx.showToast({
        title: '登录成功了',
      });
      if (cb && typeof cb === 'function') {
        cb(token)
      }
    }

    const login = () => {
      wx.login({
        success: (res) => {
          if (res.code) {
            console.log('res.code is ', res.code);
            requestLoginApi(res.code);
          } else {
            console.log('登录失败！' + res.errMsg);
          }
        }
      });
    }

    wx.checkSession({
      success: (res) => {
        let token = wx.getStorageSync('token');
        if (token) {
          onUserLogin(token)
        } else {
          // session会重复，需要处理
          login()
        }
      },
      fail: (err) => {
        // session_key 已经失效，需要重新执行登录流程
        login()
      }
    })
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