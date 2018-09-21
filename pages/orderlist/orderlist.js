// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    translateX:0,
    curIndex:0,
    swiperList:[
      {
        img:1
      },{
        img: 1
      },{
        img: 1
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    })

    this.animation = animation

    animation.scale(2, 2).rotate(45).step();

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.translate(30).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)

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
  
  },
  //触摸开始的事件
  swiperTouchstart: function (e) {
    // console.log('touchstart',e);
    let startClinetX = e.changedTouches[0].clientX;
    this.setData({
      startClinetX: startClinetX, //触摸开始位置；
      startTimestamp: e.timeStamp, //触摸开始时间；
    })
  },

  //触摸移动中的事件
  swiperTouchmove: function (e) {
     console.log('touchmove',e);
  },

  //触摸结束事件
  swiperTouchend: function (e) {
     console.log("触摸结束",e);

    let times = e.timeStamp - this.data.startTimestamp, //时间间隔；
      distance = e.changedTouches[0].clientX - this.data.startClinetX; //距离间隔；
    //判断
    if (times < 500 && Math.abs(distance) > 10) {
      let curIndex = this.data.curIndex;

      let x0 = this.data.itemWidth, x1 = this.data.translateDistance, x = 0;
      if (distance > 0) {

        curIndex = curIndex - 1
        if (curIndex < 0) {
          curIndex = 0;
          x0 = 0;
        }
        x = x1 + x0;
      } else {

        // console.log('+1',x);
        curIndex = curIndex + 1
        if (curIndex >= this.data.swiperList.length) {
          curIndex = this.data.swiperList.length - 1;
          x0 = 0;
        }
        x = x1 - x0;
      }
      this.animationToLarge(curIndex, x);
      this.animationToSmall(curIndex, x);
      this.setData({
        curIndex: curIndex,
        translateDistance: x
      })

    } else {

    }
  },
  // 动画
  animationToLarge: function (curIndex, x) {
    console.log("animationToLarge");
    this.animation.translateX(x).scale(1).step()
    this.setData({
      animationToLarge: this.animation.export()
    })
  },
  animationToSmall: function (curIndex, x) {
    console.log("animationToSmall");
    this.animation.translateX(x).scale(0.7).step()
    this.setData({
      animationToSmall: this.animation.export()
    })
  }

})