// pages/personCenter/personCenter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    sex: '',
    college: '',
    isSelf: '',//判断是不是本人
    isEdit: false,//判断是不是修改模式
    imgUrl: '',
    sexIndex: 0, //选择性别时
    collegeIndex: 0, //选择学院的时候
    myShare: 0,//显示经验还是话题还是打卡,0为经验，1为话题，2为打卡
    sexRange: ['保密', '男', '女'],
    collegeRange: [ '保密',
                    '资源环境与安全工程学院',
                    '土木工程学院',
                    '机电工程学院',
                    '信息与电气工程学院',
                    '计算机科学与工程学院',
                    '化学化工学院',
                    '数学与计算科学学院',
                    '物理与电子科学学院',
                    '生命科学学院',
                    '建筑与艺术设计学院',
                    '人文学院',
                    '外国语学院',
                    '马克思主义学院',
                    '教育学院',
                    '商学院',
                    '艺术学院',
                    '体育学院',
                    '法学与公共管理学院',
                    '材料科学与工程学院'
    ],
    object1: [{//经验列表
      id: 1,
      title: "经验1的标题",
      time: '2020-2-29',
      view: 666,
      good: 777,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、',
      img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      plate: "如果学习英语"
    },{
      id: 2,
      title: "经验2的标题",
      time: '2020-3-29',
      view: 777,
      good: 888,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、',
      img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      plate: "如果学习高数"
    },{
      id: 3,
      title: "经验3的标题",
      time: '2020-4-29',
      view: 888,
      good: 999,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、',
      img: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
      plate: "如果学习计算机"
    }],
    object2: [{//话题列表
      id: 1,
      name: "话题1的名字",
      time: '2020-2-29',
      view: 666,
      good: 777,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }, {
      id: 2,
      name: "话题2的名字",
      time: '2020-3-29',
      view: 777,
      good: 888,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }, {
      id: 3,
      name: "话题3的名字",
      time: '2020-4-29',
      view: 888,
      good: 999,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }],
    object3: [{//打卡列表
      id: 1,
      title: "打卡1的标题",
      keepDay: 66,
      totalDay: 77,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }, {
      id: 2,
      title: "打卡2的标题",
      keepDay: 77,
      totalDay: 88,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }, {
      id: 3,
      title: "打卡3的标题",
      keepDay: 88,
      totalDay: 99,
      description: '这是一些简略信息，这是一些简略信息，这是一些简略信息、、、、'
    }]
  },

  sexChange: function (e) {//改变性别的时候
    console.log("改变性别的时候：",e);
    this.setData({
      sexIndex: e.detail.value,
      sex: this.data.sexRange[e.detail.value]
    });
  },
  collegeChange: function (e) {//改变学院的时候
    console.log("改变学院的时候：",e);
    this.setData({
      collegeIndex: e.detail.value,
      college: this.data.collegeRange[e.detail.value]
    });
  },
  nameChange: function(e){//名字改变的时候
    console.log("名字改变的时候", e);
    this.setData({
      name: e.detail.value
    });
  },
  toEdit: function(){//进入修改模式
    let sexRange = this.data.sexRange;
    let collegeRange = this.data.collegeRange;
    let sex = this.data.sex;
    let college = this.data.college;
    let sexIndex = 0;
    let collegeIndex = 0;
    sexRange.forEach(function (item, index) {
      if (item == sex) {
        sexIndex = index;
      }
    });
    collegeRange.forEach(function (item, index) {
      if (item == college) {
        collegeIndex = index;
      }
    });
    this.setData({
      collegeIndex: collegeIndex,//将显示哪里变成用户的信息
      sexIndex: sexIndex,//
      isEdit: true//进入修改模式
    });
  },
  saveEdit: function(){//保存修改
    let that = this;
    wx.request({
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      url: app.globalData.sameUrl + app.globalData.userUpdateUserInfo,
      data: {
        name: that.data.name,
        sex: that.data.sex,
        college: that.data.college,
        openid: app.globalData.openid
      },
      method: 'post',
      success: res => {
        if(res.data.code == 1){
          wx.showToast({
            title: "更改成功",
            image: '../../image/成功.png'
          });
          app.globalData.name = that.data.name;
          app.globalData.sex = that.data.sex;
          app.globalData.college = that.data.college;
          that.setData({
            isEdit: false
          });
        }else{
          wx.showToast({
            title: "更改失败",
            image: '../../image/登录失败.png'
          });
        }
      }
    })
  },
  myExperience: function(){//个人经验
    console.log("个人经验：", this.data);
    this.setData({
      myShare: 0
    });
  },
  myTopic: function(){//个人话题
    console.log("个人话题：", this.data);
    this.setData({
      myShare: 1
    });
  },
  myCard: function(){//个人打卡
    console.log("个人打卡：", this.data);
    this.setData({
      myShare: 2
    });
  },
  experienceArticle: function(e){//点击经验去经验页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/experienceContent/experienceContent?shareID=' + this.data.object1[index].id + '&userID=' + app.globalData.userID
    });
  },
  topicArticle: function (e) {//点击话题去话题页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/topicContent/topicContent?topicID=' + this.data.object2[index].id + '&userID=' + app.globalData.userID
    });
  },
  cardDetail: function (e) {//点击打卡去打卡详细页面
    let index = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/cardDetail/cardDetail?cardID=' + this.data.object3[index].id + '&userID=' + app.globalData.userID
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("跳转到个人中心界面：",options);
    if (app.globalData.isLogin == true) {//用户已经登录了
      if (app.globalData.userID == options.userID) {//再判断是不是自己进入的个人中心
        this.setData({
          isSelf: true,
          name: app.globalData.name,
          sex: app.globalData.sex,
          college: app.globalData.college,
          imgUrl: app.globalData.userInfo.avatarUrl
        });
      }else{//不是本人进入
        this.setData({
          isSelf: false,
          name: app.globalData.name,
          sex: app.globalData.sex,
          college: app.globalData.college,
          imgUrl: app.globalData.userInfo.avatarUrl
        });
      }
    }
    //这里还要调用接口获取用户的信息
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})