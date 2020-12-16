<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="navbox">
    <div class="nav">
      <ly-tab
        v-model="selectedId"
        :items="items"
        :options="options"
        @change="changeTab"
      ></ly-tab>
      <!-- 需要采用点击事件来实现页面的跳转  称之为编程式路由 -->
    </div>
    <div class="cata">
      <i class="iconfont icon-2"></i>
      <span>分类</span>
    </div>
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
      active: "/home/index",
      routes: [
        "/home/index",
        "/home/household",
        "/home/clothing",
        "/home/shoebag",
        "/home/mobilephones",
        "/home/computer",
        "/home/hometextiles",
        "/home/personalmakeup",
      ],
      selectedId: 0,
      items: [
        { label: "首页" },
        { label: "家用电器" },
        { label: "男装女装" },
        { label: "鞋靴箱包" },
        { label: "手机数码" },
        { label: "电脑办公" },
        { label: "家居家纺" },
        { label: "个人美妆" },
      ],
      options: {
        activeColor: "#fff",
        // 可在这里指定labelKey为你数据里文字对应的字段名
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route: function () {
      // console.log(
      //   document.getElementsByClassName("navbox")[0].style.backgroundColor
      // );
      this.routes.forEach((item, index) => {
        if (item == this.$route.path) {
          this.selectedId = index;
        }
      });
    },
  },
  //方法集合
  methods: {
    changeTab (item, index) {
      this.$router.push(this.routes[index]); //编程式路由
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    console.log(this.$route.path);
    console.log();
    this.routes.forEach((item, index) => {
      if (item == this.$route.path) {
        this.selectedId = index;
      }
    });
  },
};
</script>
<style lang='less'>
.navbox {
  width: 100%;
  height: 4.4rem;
  display: flex;
  // background-color: red;
  border-bottom: 0.1rem solid #efefef;
  background-color: transparent;
  color: #fff;
  // margin-top: 4.4rem;
  // position: fixed;
  // top: 4.4rem;
  // left: 0;
  z-index: 99;
  .nav {
    width: 80%;
    height: 4.4rem;
    overflow: hidden;
    .ly-tab {
      height: 4.4rem;
      .ly-tabbar {
        height: 4.44rem;
        background-color: rgba(0, 0, 0, 0);
        border-bottom: 0px solid #000;
        span {
          color: #fff;
        }
      }
    }
  }
  .cata {
    width: 20%;
    height: 4.4rem;
    line-height: 4.4rem;
    text-align: center;
    box-shadow: -6px 0 4px -4px rgba(0, 0, 0, 0.4);
    i {
      font-size: 1.5rem;
    }
    span {
      font-size: 1.5rem;
    }
  }
}
</style>