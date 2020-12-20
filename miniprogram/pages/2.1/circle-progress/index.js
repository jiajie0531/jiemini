// pages/2.1/circle-progress/index.js
Component({
  runTimerid:0,
  behaviors: [],
  /**
   * Component properties
   */
  properties: {
    percent:{
      type: Number,
      value: 0, 
      observer: function(newVal, oldVal){
        this.draw(newVal);
      }
    },
  },

  /**
   * Component initial data
   */
  data: {
    percentage: '', // 百分比
    animTime: '', // 动画执行时间
  }, // 私有数据，可用于模版渲染
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function(){},
    moved: function(){},
    detached: function(){},
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function(){}, // 此处声明的attached的声明会被lifetimes字段中的声明覆盖
  pageLifetimes: {
    // 组件所在页面的生命周期函数
  },
  /**
   * Component methods
   */
  methods: {

  }
})
