import Toast from 'tdesign-miniprogram/toast/index';
import { getStorage } from "../utils/getStorage";
// const baseUrl = "http://47.109.43.117:3000";
// export const baseUrl = "http://localhost:3000";
export const baseUrl = "https://gzh.junejh.cn";

function request(url,method,data={}){
  return new Promise(async (resolve,reject)=>{
    const token = await getStorage("access_token");
    if(!token){
      wx.navigateTo({
        url: '/pages/usercenter/login/login',
      })
      return;
    }
    wx.request({
      url:`${baseUrl}${url}`,
      method,
      data,
      header:{
        "content-type":"application/json",
        "Authorization":!!token ? `Bearer ${token}`:""
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



export async function requestPost(url,data={}){
  return new Promise((resolve,reject)=>{
    console.log('执行这个')
    wx.request({
      url:`${baseUrl}${url}`,
      method:"POST",
      data,
      header:{
        'Content-Type': 'application/x-www-form-urlencoded',
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

export function commonRequest(url,method,data={}){
  return new Promise(async (resolve,reject)=>{
   
    wx.request({
      url:`${baseUrl}${url}`,
      method,
      data,
      header:{
        "content-type":"application/json",
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