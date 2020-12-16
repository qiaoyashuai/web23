<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="pintuan">
    <div class="pintuantop">
      <h1>拼团专区</h1>
      <p>拼着买更实惠<span><i class="iconfont icon-xiangyou"></i></span></p>
    </div>
    <div class="goodlist">
      <ul>
        <li
          v-for="(data,index) in datas"
          :key="index"
        >
          <img :src="data.goods_thumb">
          <div>
            {{data.goods_name}}
          </div>
          <p>
            <img
              src="../images/005.png"
              alt=""
            >
            {{data.team_price_formated}}
          </p>
          <span>
            {{data.shop_price_formated}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Axios from "axios";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      datas: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getdatas () {
      Axios.get("/api/visual/visual_team_goods").then((res) => {
        // console.log(res.data);
        this.datas = res.data.data;
        // console.log(this.datas);
        // console.log(this.datas.data);
      });
    },
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getdatas();
  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.pintuan {
  width: calc(100% - 2rem);
  height: 25.3rem;
  background-color: #fff;
  margin: 2rem auto;
  .pintuantop {
    width: 100%;
    height: 4.9rem;
    border-bottom: 0.1rem solid #ccc;
    display: flex;
    line-height: 4.9rem;
    justify-content: flex-start;
    align-content: center;
    h1 {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0 1rem;
    }
    p {
      font-size: 1.4rem;
      color: #888;
      font-weight: normal;
      i {
        color: red;
      }
    }
  }
  .goodlist {
    width: calc(100% - 1rem);
    height: 19.8rem;
    padding: 1rem 0 0 1rem;
    overflow: hidden;
    background-color: #fff;
    ul {
      width: auto;
      display: flex;
      justify-content: flex-start;
      align-self: start;
      overflow: auto;
      li {
        width: 10.9rem;
        height: 18.9rem;
        padding: 0 0.3rem;
        text-align: center;
        img {
          width: 10.9rem;
          height: 10rem;
        }
        div {
          width: 6rem;
          height: 2rem;
          font-size: 1.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0 auto;
          margin-top: 1rem;
        }
        p {
          font-size: 1.6rem;
          color: red;
          line-height: 3rem;
          img {
            width: 1.8rem;
            height: 1.8rem;
          }
        }
        span {
          font-size: 1.2rem;
          text-decoration: line-through;
          color: #888;
        }
      }
    }
  }
}
</style>