import { getCaptcha, login } from "../../../services/system";
import Message from 'tdesign-miniprogram/message/index';

// pages/usercenter/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    code_token: "",
    code: "",
    codeUrl: "",
    loading:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCaptchaHander()

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },



  async loginHander() {
    this.setData({
      loading:true
    })
    const res = await login({
      username: this.data.username,
      password: this.data.password,
      code_token: this.data.code_token,
      code: this.data.code,
    })
    if (res.code === "10200") {
      wx.setStorage({
        key:"user",
        data:res.data.user,
      })
      wx.setStorage({
        key:"access_token",
        data:res.data.access_token,
        success(){
          wx.switchTab({url:"/pages/usercenter/index"});
        }
      })

    } else {
      Message.error({
        context: this,
        duration: 5000,
        content: res.message,
      });
      this.setData({loading:false})
    }

  },

  async getCaptchaHander() {
    const res = await getCaptcha();
    if (res.code === "10200") {
      this.setData({
        code_token: res.data.codeToken,
        codeUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(res.data.codeSrc)}`
      })
    }
  }
})