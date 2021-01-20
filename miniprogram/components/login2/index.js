// components/login2/index.js
Component({ 
  /**
   * Component properties
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    'show': function (value) {
      console.log(value);

      this.setData({
        visible: value
      });
    }
  },
  /**
   * Component initial data
   */
  data: {
    visible: false
  },
  /**
   * Component methods
   */
  methods: {
    close(e) {
      this.setData({
        visible: false
      })
    },
    async login(e, retryNum = 0) {
      let {
        userInfo,
        encryptedData,
        iv
      } = e.detail;

      let token = null; 
      // 本地token与微信服务器上的session要分别对待
      let tokenIsValid = false;
      try {
        await getApp().wxp.checkSession();
        let token = wx.getStorageSync('token');
        if (token) {
          tokenIsValid = true;
        }
      } catch (error) {
      }

      if (!tokenIsValid) {
        let res1 = await getApp().wxp.login();
        let code = res1.code;
        console.log("code", code);

        let res = await getApp().wxpwx.request({
          url: 'http://localhost:3009/user/wexin-login2',
          method: 'POST',
          header: {
            'content-type': 'application/json' 
          },
          data: {
            code,
            userInfo,
            encryptedData,
            iv,
            sessionKeyIsValid:sessionIsValid
          }
        });
 
        console.log('登录接口请求成功', res.data);
        token = res.data.data.authorizationToken;
        wx.setStorageSync('token', token);
        console.log('authorization', token);
      }
      
      getApp().globalData.token = token;
      wx.showToast({
        title: '登录成功了',
      });
      this.close();
      this.triggerEvent('loginSuccess');
      getApp().globalEvent.emit('loginSuccess');
    },
    login2(e){}
  }
})
