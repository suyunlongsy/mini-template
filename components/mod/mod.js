// components/hello/hello.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    outerNum: {
      type: Number,
      value: 5,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    innerNum: 666
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _myClick(e) {
      let {innerNum} = this.data 
      this.setData({
        innerNum: innerNum + 10,
      })
      const myEventDetail = {
        innerNum: innerNum + 10
      } // detail对象，提供给事件监听函数
      this.triggerEvent('fun', myEventDetail)
    },
  }
})