Page({
  data: {
    projectInfo: null,
    projectImages: [],
    showShareModal: false,
    shareImageUrl: '',
    // 捐赠相关数据
    showDonationModal: false,
    donationOptions: [
      { id: 1, amount: 20, trees: 1 },
      { id: 2, amount: 50, trees: 2.5 },
      { id: 3, amount: 100, trees: 5 },
      { id: 4, amount: 200, trees: 10 }
    ],
    selectedOption: null,
    customAmount: '',
    customTrees: 0,
    // 沙尘暴详情显示控制
    showDustStormDetails: false
  },

  onLoad(options) {
    const id = options.id;
    // 模拟获取项目详情数据
    const projectData = {
      id: 1,
      title: '许嵩粉丝团植树项目',
      description: '这是一个由许嵩粉丝发起的公益植树项目，旨在通过音乐人和粉丝的力量为地球增添一片绿色。项目计划在全国多个地区开展植树活动，预计种植各类树木1000棵。我们相信，每一棵树都承载着对未来的期望，每一片绿叶都是对环境的承诺。通过这个项目，我们不仅能为地球增添绿色，更能传递环保理念，让更多人参与到保护地球的行动中来。',
      progress: 60,
      targetTrees: 1000,
      dustStormCount: 8,
      dustStormRecords: [
        {
          id: 1,
          date: '3月15日',
          location: '北京',
          level: '中'
        },
        {
          id: 2,
          date: '3月8日',
          location: '内蒙古',
          level: '强'
        },
        {
          id: 3,
          date: '2月28日',
          location: '新疆',
          level: '弱'
        },
        {
          id: 4,
          date: '2月20日',
          location: '甘肃',
          level: '中'
        }
      ],
      myTrees: [
        {
          id: 1,
          count: 10,
          isGrown: false,
          plantDate: '2024年2月1日',
          daysPassed: 45
        },
        {
          id: 2,
          count: 5,
          isGrown: true,
          plantDate: '2023年8月15日',
          daysPassed: 180
        }
      ],
      // 项目公示记录
      disclosureRecords: [
        {
          id: 1,
          date: '3月20日',
          amount: 5000,
          area: 2500,
          location: '内蒙古阿拉善盟'
        },
        {
          id: 2,
          date: '3月10日',
          amount: 3200,
          area: 1600,
          location: '新疆塔克拉玛干沙漠边缘'
        },
        {
          id: 3,
          date: '2月28日',
          amount: 4800,
          area: 2400,
          location: '甘肃民勤县'
        },
        {
          id: 4,
          date: '2月15日',
          amount: 2600,
          area: 1300,
          location: '宁夏中卫市'
        },
        {
          id: 5,
          date: '2月5日',
          amount: 3800,
          area: 1900,
          location: '内蒙古库布齐沙漠'
        }
      ],
      images: [
        '/images/xufans.png',
        '/images/shili2.png',
        '/images/shili2.png'
      ]
    };

    this.setData({
      projectInfo: projectData,
      projectImages: projectData.images
    });
  },

  joinPlanting() {
    // 显示捐赠弹窗
    this.setData({
      showDonationModal: true,
      selectedOption: null,
      customAmount: '',
      customTrees: 0
    });
  },

  // 捐赠相关方法
  hideDonationModal() {
    this.setData({
      showDonationModal: false,
      selectedOption: null,
      customAmount: '',
      customTrees: 0
    });
  },

  selectDonationOption(e) {
    const optionId = e.currentTarget.dataset.id;
    this.setData({
      selectedOption: optionId,
      customAmount: '', // 清空自定义金额
      customTrees: 0
    });
  },

  selectCustomOption() {
    this.setData({
      selectedOption: null // 清空预设选项
    });
  },

  onCustomAmountInput(e) {
    const amount = parseFloat(e.detail.value) || 0;
    const trees = Math.floor((amount / 20) * 10) / 10; // 20元=1颗树，保留1位小数
    
    this.setData({
      customAmount: e.detail.value,
      customTrees: trees,
      selectedOption: null // 清空预设选项
    });
  },

  confirmDonation() {
    let amount = 0;
    let trees = 0;

    if (this.data.selectedOption) {
      // 使用预设档位
      const option = this.data.donationOptions.find(item => item.id === this.data.selectedOption);
      amount = option.amount;
      trees = option.trees;
    } else if (this.data.customAmount && this.data.customAmount > 0) {
      // 使用自定义金额
      amount = parseFloat(this.data.customAmount);
      trees = this.data.customTrees;
    } else {
      wx.showToast({
        title: '请选择捐赠金额',
        icon: 'none'
      });
      return;
    }

    // 这里可以调用支付接口
    wx.showModal({
      title: '确认捐赠',
      content: `您将捐赠 ¥${amount}，相当于种植 ${trees} 颗梭梭树`,
      confirmText: '确认支付',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 调用支付接口
          this.processDonation(amount, trees);
        }
      }
    });
  },

  processDonation(amount, trees) {
    // 模拟支付过程
    wx.showLoading({
      title: '支付中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '捐赠成功',
        icon: 'success'
      });
      
      this.hideDonationModal();
      
      // 可以在这里更新项目进度等数据
      // 或者重新加载页面数据
    }, 2000);
  },

  showShareModal() {
    this.setData({
      showShareModal: true,
      shareImageUrl: '' // 重置分享图片
    });
    
    // 生成分享图片
    this.generateShareImage();
  },

  hideShareModal() {
    this.setData({
      showShareModal: false,
      shareImageUrl: ''
    });
  },

  toggleDustStormDetails() {
    this.setData({
      showDustStormDetails: !this.data.showDustStormDetails
    });
  },

  preventClose() {
    // 阻止事件冒泡，防止点击内容区域关闭弹窗
  },

  generateShareImage() {
    // 这里调用分享图片生成API
    // 您可以在这里替换为实际的API调用
    setTimeout(() => {
      // 模拟API调用延迟
      this.setData({
        shareImageUrl: '/images/share-demo.png' // 临时使用示例图片
      });
    }, 1500);
  },

  saveShareImage() {
    if (!this.data.shareImageUrl) return;
    
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImageUrl,
      success: () => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
        this.hideShareModal();
      },
      fail: () => {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    });
  }
}); 