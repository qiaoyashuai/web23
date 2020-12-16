<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div>
    <ul>
      <router-link
        to="/home"
        tag="li"
      >
        <i
          class="iconfont icon-shouye"
          v-if="active.includes('/home')"
        ></i>
        <i
          class="iconfont icon-icon_huabanfuben"
          v-else
        ></i>
        <p>首页</p>
      </router-link>
      <router-link
        to="/catalog"
        tag="li"
      >
        <i
          class="iconfont icon-fenlei"
          v-if="active.includes('/catalog')"
        ></i>
        <i
          class="iconfont icon-ziyuan"
          v-else
        ></i>
        <p>分类</p>
      </router-link>
      <router-link
        tag="li"
        to="/find"
      >
        <i
          class="iconfont icon-faxian1"
          v-if="active.includes('/find')"
        ></i>
        <i
          class="iconfont icon-faxian"
          v-else
        ></i>
        <p>发现</p>
      </router-link>
      <router-link
        tag="li"
        to="/cart"
      >
        <i
          class="iconfont icon-gouwuche"
          v-if="active.includes('/cart')"
        ></i>
        <i
          class="iconfont icon-dilanxianxingiconyihuifu_huabanfuben"
          v-else
        ></i>
        <p>购物车</p>
      </router-link>
      <router-link
        tag="li"
        to="/mine"
      >
        <i
          class="iconfont icon-wode"
          v-if="active.includes('/mine')"
        ></i>
        <i
          class="iconfont icon-ziyuan1"
          v-else
        ></i>
        <p> 我的</p>
      </router-link>
    </ul>
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
      active: "home"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // "this.$router.path":function(){
    //   console.log(this.$route.path);
    //   this.active=this.$route.path
    // }
  },
  //方法集合
  methods: {

  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    console.log(this.$route.path);
    this.active = this.$route.path
  },
}
</script>
<style lang="less" scoped>
div {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 4.9rem;
  width: 100%;
  z-index: 99;
  background-color: #fff;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    li {
      width: 20%;
      font-size: 1.5rem;
      i {
        font-size: 2rem;
      }
    }
  }
}
</style>