// components/pop-up/index.js
Component({
  observers: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * Component properties
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * Component initial data
   */
  data: {

  },
  ready(){
    this.triggerEvent('ready');
  },
  /**
   * Component methods
   */
  methods: {
    popPreventTouchmove() { },
    popPreventTouchmove2() { },
    popPreventTouchmove3() { },
    cityChange() { },
  }
})
