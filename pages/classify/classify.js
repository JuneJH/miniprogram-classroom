import request, { baseUrl } from "../../services/request";



Page({
  offsetTopList: [],
  data: {
    list: [],
    sideBarIndex: 1,
    scrollTop: 0,
    categories: [],
    subTitle: "",
  },
  onLoad() {
    this.getClassify();
  },
  onSideBarChange(e) {
    const { value ,label} = e.detail;
    this.getDataByClassify({ id: value })
    this.setData({ sideBarIndex: value, scrollTop: 0,subTitle:label });
  },

  async getDataByClassify(condition) {
    const { id, ...cond } = condition;
    try {
      const data = await request("/video/course/use/" + id, "get", { page: 1, size: 100, ...cond });
      if (data.code == "10200") {
        const target = data.data.data.map((item) => ({ ...item, coverUrl: `${baseUrl}${item.coverUrl}` }));
        this.setData({
          list: target
        });
      }
    } catch (err) {

    }
  },
  goDetail(e) {
    const { dataset } = e.currentTarget;
    const id = dataset.id;
    wx.navigateTo({
      url: `/pages/videoDetail/videoDetail?spuId=${id}`,
    });
  },

  async getClassify() {
    try {
      const data = await request("/course/shelves", "get", { page: 1, size: 20 });
      if (data.code == "10200") {
        const item = data.data.data[0]
        const id = item.id;
        this.getDataByClassify({ id });
        this.setData({
          categories: data.data.data,
          sideBarIndex: id,
          subTitle:item.title
        });
      }
    } catch (err) {

    }
  }
});
