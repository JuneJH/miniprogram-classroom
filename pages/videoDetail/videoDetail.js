import request,{baseUrl} from "../../services/request";
// pages/videoDetail/videoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageLoading:false,
    fileUrl:"",
    id:"",
    baseUrl,
    rowCol: [{ size: '327rpx', borderRadius: '24rpx' }, 1, { width: '61%' }],
    videoInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.id = options.spuId;
    this.getVideoInfo(this.id);

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

  async getVideoInfo(id) {
    this.setData({
      pageLoading: true,
    });
    const data = await request("/video/"+id);
    if(data.code === "10200"){
      const {fileUrl,tags,...info } = data.data || {};
      this.setData({
        fileUrl,
        videoInfo:{...info,tags:tags ? tags.split(","):[]},
        pageLoading: false,
      });
    }

  },
})