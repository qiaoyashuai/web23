<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="xianshi">
    <div class="xianshidata">
      <img
        src="../images/004.png"
        alt
      />
      <p>
        距结束还剩:
        <span
          v-for="(item,index) in date"
          :key="index"
        >{{item}}</span>
      </p>
    </div>
    <div class="datas">
      <!-- <p>{{datas.data.data.time_list}}</p> -->
      <p
        v-for="(item,index) in time_list"
        :key="index"
        :class="{borbom:item.status}"
      >
        <span :class="{red:item.status}">{{item.title}}</span>
        <span
          v-if="item.status"
          class="red"
        >抢购中</span>
        <span v-else>即将开始</span>
      </p>
    </div>
    <!-- <div class="products">
      <div class="goodbox">
        <div
          v-for="(item,index) in seckill_list"
          :key="index"
          class="allgoods"
        >
          <div class="imgbox">
            <img
              :src="item.goods_thumb"
              alt
            />
            <img
              src="../images/002.png"
              alt
            />
          </div>
          <div class="goods">
            <p class="goodname">{{item.goods_name}}</p>
            <p>{{item.sec_price_formated}}</p>
            <p>{{item.market_price_formated}}</p>
          </div>
        </div>
      </div>
    </div> -->
    <p>查看更多秒杀商品 ></p>
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
      otime: null,
      date: [],
      time_list: [],
      seckill_list: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getdata () {
      //创建方法来获取倒计时
      let nowdat = new Date();
      let timer1 = nowdat.getTime();
      var towdate = new Date("2022-12-17 00:00:00");
      let timer2 = towdate.getTime();
      let otime = timer2 - timer1;
      var miao = parseInt((otime / 1000) % 60); //秒
      var fen = parseInt((otime / 1000 / 60) % 60); //分
      var shi = parseInt((otime / 1000 / 60 / 60) % 24); //时
      if (shi < 10) {
        shi = "0" + shi;
      }
      if (fen < 10) {
        fen = "0" + fen;
      }
      if (miao < 10) {
        miao = "0" + miao;
      }
      let arr = [shi, fen, miao];
      this.date = arr;
    },
    Axiosfn (path) {
      // /api/visual/visual_seckill  接口
      Axios.get(path).then((res) => {
        this.time_list = res.data.data.time_list;
        // console.log(this.time_list);
        // console.log(this.datas.data.data.time_list[0].title);
        // console.log(this.time_list);
        // console.log(res.data.data);
        this.seckill_list = res.data.data.seckill_list;
        // console.log(res.data.data);
        // console.log(this.seckill_list);
      });
    },
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.otime = setInterval(this.getdata, 1000);
    this.Axiosfn("/api/visual/visual_seckill");
  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () {
    this.otime = null
  }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.xianshi {
  width: calc(100% - 2rem);
  // height: 36rem;
  margin: 0 auto;
  background-color: #fff;
  .xianshidata {
    width: 100%;
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 5.5rem;
    img {
      width: 10rem;
      height: 2.1rem;
    }
    p {
      height: 5rem;
      line-height: 5rem;
      font-size: 1.2rem;
      text-align: right;
      span {
        background-color: red;
        padding: 0.5rem;
        color: #fff;
        border-radius: 0.3rem;
        margin: 0 0.3rem;
      }
    }
  }
  .datas {
    width: 100%;
    height: 4.8rem;
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 0.5rem 0;
    p {
      width: 25%;
      padding-bottom: 0.8rem;
      border-bottom: 0.2rem solid #efefef;
      span {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 1.4rem;
        font-weight: normal;
        color: #999;
        // line-height: 2.4rem;
      }
    }
    .red {
      font-weight: 600;
      // line-height: 2.4rem;
    }
    .borbom {
      font-weight: 600;
      border-bottom: 0.2rem solid red;
    }
    .borbom > span {
      color: red !important;
    }
    .borbom > span:first-child {
      font-size: 1.8rem;
    }
  }
  .products {
    width: 100%;
    // padding: 1rem;
    // height: 18.8rem;
    min-height: 2rem;
    overflow: hidden;
  }
  p {
    width: 100%;
    height: 4rem;
    text-align: center;
    font-size: 1.4rem;
    color: #000;
    font-weight: 500;
  }
}
</style>