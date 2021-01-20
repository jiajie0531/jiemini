import {
  promisifyAll
} from 'miniprogram-api-promise';

const wxp = {}
promisifyAll(wx, wxp)

// 捕获错误 3.6 
wxp.request2 = function (args) {
  let token = wx.getStorageSync('token');
  if (token) {
    if (!args.header) {
      args.header = {}
    }
    args.header['Authorization'] = `Bearer ${token}`;
  }
  return wxp.request(args).catch(function (reason) {
    console.log('reason', reason);
  });
}

export default wxp