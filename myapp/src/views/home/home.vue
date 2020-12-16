<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="home">
    <Header />
    <ly-tab />
    <div class="routerbox">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
// var bus = new Vue(); //兄弟组件传值
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "../../components/footer";
import Header from "./components/header";
import lyTab from "./components/ly-tab";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Footer, Header, lyTab },
  data () {
    //这里存放数据
    return {
      // active: "/home/index",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route: function () {
      this.changestyle();
    },
  },
  //方法集合
  methods: {
    changestyle () {
      if (this.$route.path != "/home/index") {
        //  console.log(this.$route.path);
        //  console.log(this.active);
        // document.getElementsByClassName("navbox")[0].style.backgroundColor =
        //   "red";
        document.getElementsByClassName(
          "home-header"
        )[0].style.backgroundColor = "#E22F2A";
        document.getElementsByClassName("navbox")[0].style.backgroundColor =
          "#E22F2A";
        document.getElementsByClassName("routerbox")[0].style.marginTop =
          "0rem";
      } else {
        document.getElementsByClassName("routerbox")[0].style.marginTop =
          "14rem";
        document.getElementsByClassName(
          "home-header"
        )[0].style.backgroundColor = "transparent";
        document.getElementsByClassName("navbox")[0].style.backgroundColor =
          "transparent";
      }
      // console.log(
      //   document.getElementsByClassName("home-header")[0].style.backgroundColor
      // );
    },
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // console.log(document.getElementsByTagName("router-view")[0]);
    this.changestyle();
    // console.log(document.getElementsByClassName("bg")[0].style.backgroundColor);
  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
// .bg {
//   background-color: red;
//   width: 100%;
//   height: 14rem;
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 9;
//   border-bottom-right-radius: 3rem;
//   border-bottom-left-radius: 3rem;
// }
.routerbox {
  margin-top: 14rem;
}
</style>