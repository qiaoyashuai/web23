<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='search'>
    <div class='cataheader'>
      <span> <i class="iconfont icon-xiaoyuhao"></i></span>
      <p>
        <input
          type="text"
          v-model="keyword"
          placeholder="请输入关键字"
        >
        <i
          class="iconfont icon-sousuo"
          @click="searchkeyword"
        ></i>
      </p>
    </div>
    <div class="searchtop">
      <p>最近搜索</p>
      <span>
        <i
          class="iconfont icon-shanchu"
          @click="removeaddsearch"
        ></i>
      </span>
    </div>
    <ul>
      <li v-show="addkeywords.length==0">暂无</li>
      <li
        v-for="(item,index) in addkeywords"
        :key="index"
        @click="tosearch(index)"
      >
        {{item}}</li>
    </ul>
    <div class="searchtop hotsearch">
      <p>热门搜索</p>
    </div>
    <ul>
      <li>手机</li>
      <li>手机</li>
      <li>手机</li>
      <li>手机</li>
      <li>手机</li>
      <li>手机</li>
    </ul>
    <searchfooter />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import searchfooter from "../../../components/footer"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { searchfooter },
  data () {
    //这里存放数据
    return {
      keyword: "",
      showfn: true
    };
  },
  //监听属性 类似于data概念
  computed: {
    addkeywords () {
      return this.$store.state.addkeywords
    },
  },
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {
    tosearch (index) {
      this.$router.push("/searchlist?keywords=" + this.addkeywords[index])
    },
    searchkeyword () {
      if (this.keyword) {
        this.$store.commit("addkeywords", this.keyword)
        this.$store.commit("keywords", this.keyword)
        // this.$store.state.cataloglistsdata = [];
        console.log(this.$store.state.cataloglistsdata);
        this.$router.push("/searchlist?keywords=" + this.keyword)
      }
    },
    removeaddsearch () {
      console.log(1151);
      this.$store.state.addkeywords = []
      localStorage.removeItem("addkeywords")
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
<style lang="less" scoped>
html {
  background-color: #fff !important;
  .searchtop {
    width: calc(100% - 2rem);
    height: 4.4rem;
    padding: 0 1rem;
    margin-top: 5.2rem;
    line-height: 4.4rem;
    background-color: #fff;
    p {
      float: left;
      font-size: 1.6rem;
    }
    span {
      float: right;
      font-size: 1.6rem;
    }
  }
  ul {
    display: flex;
    width: calc(100% - 2rem);
    padding: 0 1rem;
    background-color: #fff;
    li {
      width: 20%;
      border: 1px solid #efefef;
      height: 3rem;
      text-align: center;
      line-height: 3rem;
      margin: 1% 2.5%;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
  .hotsearch {
    margin-top: 0;
    color: #000;
  }
}
</style>