
function loginWithCallback3(e) {
  return  new Promise(async (resolve, reject) => {
    let {
      userInfo,
      encryptedData,
      iv
    } = e.detail;

    const app = getApp();
    try {
      await app.wxp.checkSession();
    } catch (err) {
      // reject(err) 这里不能reject
    }
    let token = wx.getStorageSync('token');
    if (!token) {
      let res1 = await app.wxp.login().catch(err => {
        reject(err);
      });
      let code = res1.code;
      console.log('code is', code);
      let res = await app.wxp.request({
        url: 'http://localhost:3009/user/wexin-login2',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          code: code,
          userInfo,
          encryptedData,
          iv
        }
      }).catch(err => {
        reject(err);
      });
      console.log('res is', res);
      token = res.data.data.authorizationToken;
      wx.setStorageSync('token', token);
    }
    getApp().globalData.token = token;
    wx.showToast({
      title: '登录成功了',
    });
    resolve(token);
  });
}

export default loginWithCallback3