<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="productlist">
    <mt-swipe :auto="0">
      <mt-swipe-item>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
        <div>
          <img
            src="../images/001.png"
            alt="图片"
          />
          <p>潮流服饰</p>
        </div>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.productlist {
  height: 21.8rem;
  padding: 1rem;
  margin: 7.5rem auto -1rem;
  .mint-swipe {
    background-color: #fff;
    position: relative;
    top: 0;
    left: 0;
    border-bottom: 0.2rem solid #ccc;
    .mint-swipe-item {
      // display: flex !important;
      flex-flow: wrap row;
      // justify-content: flex-start;
      // align-items: flex-start;
      div {
        float: left;
        width: 20%;
        height: 9rem;
        margin: 0;
        text-align: center;
        img {
          width: 7rem;
          height: 7rem;
        }
      }
    }
    .mint-swipe-indicators {
      position: absolute;
      top: 19rem;
      left: calc(50%-0.8rem);
      .mint-swipe-indicator {
        width: 1.6rem;
        height: 0.4rem;
        background-color: red;
        border-radius: 0.1rem;
        margin: 0 !important;
      }
      .is-active {
        background-color: red;
        opacity: 1;
      }
    }
  }
}
</style>