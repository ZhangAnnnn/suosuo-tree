Page({
  data: {},
  onLoad() {
    console.log('地图页面加载')
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})