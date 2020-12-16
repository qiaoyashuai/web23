<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='islogin'>
    <div class="islogincontent">
      <div
        class="btn"
        @click="tologin(0)"
      >
        短信登录
      </div>
      <div
        class="btn"
        @click="tologin(1)"
      >
        账号密码登录
      </div>
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

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tologin (index) {
      this.$router.push("/login?id=" + index)
    }
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

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
.islogin {
  width: 100%;
  height: 100%;
  position: flex;
  top: 0;
  left: 0;
  .islogincontent {
    width: 100%;
    height: 5rem;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -2.5rem;
    display: flex;
    justify-content: center;
    align-content: center;
    .btn {
      flex: 1;
      text-align: center;
      font-size: 3rem;
      line-height: 5rem;
      &:first-child {
        background-color: skyblue;
      }
      &:last-child {
        background-color: pink;
      }
    }
  }
}
</style>