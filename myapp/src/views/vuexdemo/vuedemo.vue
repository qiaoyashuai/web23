<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="vuexdemo">
    <!-- p 标签内的数据可以被使用 -->
    <p>{{getnum}}</p>
    <button @click="getnumfn">改变num</button>
    <button @click="changenumFn(5)">给num添加指定的数</button>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    getnum () {
      //属性可用
      return this.$store.state.num;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getnumfn () {
      //此方法可以使用
      console.log(111);
      this.$store.commit("changenum");
    },
    changenumFn (data) {
      //此方法管用
      this.$store.commit("changenumFn", data);
    },
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    console.log(this.$store.state.num);
  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.vuexdemo {
  width: 100%;
  height: 50rem;
}
</style>