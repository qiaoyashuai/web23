<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="swipe">
    <mt-swipe
      :auto="4000"
      @change="handleChange"
    >
      <mt-swipe-item>
        <img
          src="../../../images/001.jpg"
          alt="图片"
        />
      </mt-swipe-item>
      <mt-swipe-item>
        <img
          src="../../../images/002.jpg"
          alt="图片"
        />
      </mt-swipe-item>
      <mt-swipe-item>
        <img
          src="../../../images/003.jpg"
          alt="图片"
        />
      </mt-swipe-item>
      <mt-swipe-item>
        <img
          src="../../../images/004.jpg"
          alt="图片"
        />
      </mt-swipe-item>
      <mt-swipe-item>
        <img
          src="../../../images/005.jpg"
          alt="图片"
        />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      oindex: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleChange (index) {
      this.oindex = index;
      // console.log(this.oindex);
      // sessionStorage.setItem("oindex", index);
      this.$emit("transdata", this.oindex);
    },
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.swipe {
  width: 94%;
  height: 12.2rem;
  z-index: 50;
  position: relative;
  top: -11rem;
  left: 0;
  margin: 0 auto;
  border-radius: 2rem;
  .mint-swipe {
    width: 100%;
    position: absolute;
    top: -2.5rem;
    left: 0;
    z-index: 99;
    border-radius: 2rem;
    overflow: hidden;
    .mint-swipe-items-wrap {
      width: 100%;
      height: 12.2rem;
      img {
        width: 100%;
        border-radius: 2rem;
      }
    }
    .mint-swipe-indicators {
      left: 20%;
      // .is-active{}
    }
  }
}
</style>
