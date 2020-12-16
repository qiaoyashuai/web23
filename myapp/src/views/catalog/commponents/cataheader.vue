<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='cataheader'>
    <span> <i class="iconfont icon-xiaoyuhao"></i></span>
    <p>
      <input
        type="text"
        placeholder="请输入关键字"
        @click="tosearch"
      >
      <i class="iconfont icon-sousuo"></i>
    </p>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {

  },
  data () {
    //这里存放数据
    return {

    };
  },
  //监听属性 类似于data概念
  computed: {
    hush () {
      console.log(this.$route.path);
      return this.$route.path
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tosearch () {
      if (this.hush == "/catalog") {
        this.$router.push("/search")
      }
    },
    // http://localhost:3001/#/categorylist?keywords=%E6%89%8B%E6%9C%BA
    // http://localhost:3001/#/categorylist/1131
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    console.log();
  },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
.cataheader {
  width: calc(100%);
  // margin: 0rem auto;
  padding: 1rem 1rem;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  border-bottom: 0.1rem solid #ddd;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;

  overflow: hidden;
  span {
    font-size: 1.3rem;
    color: #999;
    width: 1.6rem;
    height: 3rem;
    line-height: 3rem;
  }
  p {
    margin: 0rem 1rem;
    flex: 1;

    position: relative;
    top: 0;
    left: 0;
    input {
      width: 100%;
      height: 3rem;
      border: 0.1rem solid #ddd;
      border-radius: 1.5rem;
    }
    i {
      position: absolute;
      top: 0;
      right: 2rem;
      font-size: 1.6rem;
      color: #666;
      line-height: 3rem;
    }
  }
}
</style>