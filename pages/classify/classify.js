const image = 'https://tdesign.gtimg.com/mobile/demos/example2.png';
const items = new Array(12).fill({ label: '标题文字', image }, 0, 12);

Page({
  offsetTopList: [],
  data: {
    sideBarIndex: 1,
    scrollTop: 0,
    categories: [
      {
        label: '自然拼读',
        title: '自然拼读',
        badgeProps: {},
        items,
      },
      {
        label: '瑞格叔叔',
        title: '瑞格叔叔',
        badgeProps: {
          dot: true,
        },
        items: items.slice(0, 10),
      },
      {
        label: '牛津拼读',
        title: '牛津拼读',
        badgeProps: {},
        items: items.slice(0, 6),
      },
      {
        label: '复习',
        title: '复习',
        badgeProps: {
          count: 8,
        },
        items: items.slice(0, 8),
      },
      {
        label: '暂未开放',
        title: '暂未开放',
        badgeProps: {},
        disabled: true,
        items: [],
      },
    ],
  },
  onSideBarChange(e) {
    const { value } = e.detail;

    this.setData({ sideBarIndex: value, scrollTop: 0 });
  },
});
