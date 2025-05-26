Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "pages/treeMap/treeMap",
        text: "种树地图"
      },
      {
        pagePath: "pages/myTrees/myTrees",
        text: "我的种树"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = `/${data.path}`
      wx.switchTab({
        url,
        success: () => {
          this.setData({
            selected: data.index
          })
        }
      })
    }
  }
}) 