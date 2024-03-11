import Toast from 'tdesign-miniprogram/toast/index';
// const baseUrl = "http://47.109.43.117:3000";
const baseUrl = "http://localhost:3000";
// const baseUrl = "http://gzh.junejh.cn:3000";

function request(url,method="GET",data={}){
  return new Promise((resolve,reject)=>{
    wx.request({
      url:`${baseUrl}${url}`,
      method,
      data,
      header:{
        "content-type":"application/json"
      },
      success:function(res){
        resolve(res.data);
      },
      fail:function (res){
        Toast({
          context: this,
          selector: '#t-toast',
          message: '网络请求失败，正在申请中',
        });
        reject(res);
      }
    })
  })
}

export default request;