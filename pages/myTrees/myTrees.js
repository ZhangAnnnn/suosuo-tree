Page({
  data: {
    projects: [
      {
        id: 1,
        title: '许嵩粉丝团植树项目',
        image: '/images/xufans.png',
        growingTrees: 10,
        grownTrees: 5,
        daysPassed: 45,
        joinDate: '2024年2月1日'
      },
      {
        id: 2,
        title: '仲夏植树项目',
        image: '/images/shili2.png',
        growingTrees: 0,
        grownTrees: 5,
        daysPassed: 180,
        joinDate: '2023年8月15日'
      },
      {
        id: 3,
        title: '万物生长植树节',
        image: '/images/shili2.png',
        growingTrees: 8,
        grownTrees: 0,
        daysPassed: 60,
        joinDate: '2024年1月15日'
      }
    ]
  },

  onLoad() {
    console.log('我的种树页面加载')
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail?id=${id}`
    })
  }
})