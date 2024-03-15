import Toast from 'tdesign-miniprogram/toast/index';
import request,{baseUrl} from "../../services/request";

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  async loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    const data = await request("/swiper");
    if(data.code === "10200"){
      const {swiper, tabList } = data.data || {};
      this.setData({
        tabList,
        imgSrcs: swiper.map(item=>item.url),
        pageLoading: false,
      });
      this.loadGoodsList(true);
    }

  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }

    try {
      const data = await request("/video","get",{pageIndex,pageSize});
      if(data.code == "10200"){
        const nextList = data.data.map((item)=>({...item,coverUrl:`${baseUrl}${item.coverUrl}`}));
        this.setData({
          goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
          goodsListLoadStatus: 0,
        });
        this.goodListPagination.index = pageIndex;
        this.goodListPagination.num = pageSize;
      }
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { id } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/videoDetail/videoDetail?spuId=${id}`,
    });
  },

  goodListAddCartHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

  navToActivityDetail({ detail }) {
    const { index: promotionID = 0 } = detail || {};
    wx.navigateTo({
      url: `/pages/promotion-detail/index?promotion_id=${promotionID}`,
    });
  },
});
