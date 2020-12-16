<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='categorylist'>
    <transition name="pq">
      <div
        class="shaixuan"
        v-if="show"
      >
        <h2>自营产品</h2>
        <div class="cuxiao">
          <span>仅看有货</span>
          <span>促销</span>
        </div>
        <div class="price">
          <h3>价格区间</h3>
          <div>
            <input
              type="text"
              name="minprice"
              id="min"
              v-model.number="min"
              placeholder="最低价"
            >
            <input
              type="text"
              name="maxprice"
              id="max"
              v-model.number="max"
              placeholder="最高价"
            >
          </div>
        </div>
        <div class="pinpai">
          <p>品牌</p>
          <span>></span>
        </div>
        <div class="shaixuanfooter">
          <div @click="show=!show">关闭</div>
          <div
            @click="ok"
            class="red"
          >确定</div>
        </div>
      </div>
    </transition>
    <div>
      <div>
        <span onclick="window.history.back()"><i class="iconfont icon-xiaoyuhao"></i></span>
        <div @click="tosearch">
          <input
            type="text"
            name=""
            id=""
          >
          <i class="iconfont icon-sousuo"></i>
        </div>
        <i
          class="iconfont icon-ziyuan"
          @click="flag=!flag"
        ></i>
      </div>
      <ul>
        <li
          class="active"
          @click="changeindex1"
        >综合
          <i
            v-if="sanjiao1"
            class="iconfont icon-icon-down"
          ></i>
          <i
            v-else
            class="iconfont icon-up"
          ></i>
        </li>
        <li
          class="active"
          @click="changeindex2"
        >新品</li>
        <li
          class="active"
          @click="changeindex3"
        >销量</li>
        <li
          class="active"
          @click="changeindex4"
        >价格
          <i
            v-if="sanjiao2"
            class="iconfont icon-icon-down"
          ></i>
          <i
            v-else
            class="iconfont icon-up"
          ></i>
        </li>
        <li @click="changeindex5">筛选
          <i class="iconfont icon-shaixuan"></i>
        </li>
      </ul>
    </div>
    <ul v-infinite-scroll="loadMore">
      <router-link
        :to="'/detail/'+item.goods_id"
        tag="li"
        v-for="(item,index) in categoryListDatas"
        :key="index"
        :class="{li:flag}"
      >
        <img
          :src="item.goods_img"
          alt=""
        >
        <h4>{{item.goods_name}}</h4>
        <span>
          ￥{{item.cost_price}}
        </span>
        <div>
          <span class="span1">自营</span>
          <span class="span2">0人购买</span>
          <i class="iconfont icon-gouwuche
"></i>
        </div>
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
      show: false,
      num: 0,
      flag: false,
      index: 0,
      sanjiao1: true,
      sanjiao2: true,
      sanjiao3: true,
      size: 10,
      page: 1,
      sort: "goods_id",
      good_num: 0,
      order: "desc",
      min: "",
      max: "",
    };
  },
  //监听属性 类似于data概念
  computed: {
    categoryListDatas () {
      return this.$store.state.cataloglistsdata//状态管理里面的数据
    },
    cid () {
      return this.$route.params.cid;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tosearch () {
      this.$router.push("/search")
    },
    ok () {
      this.index = 0
      this.$store.state.cataloglistsdata = [];
      this.reqdatas();
      this.show = !this.show
      this.min = ""
      this.max = ""

    },
    loadMore () {
      this.num++;
      console.log(this.num);
      if (this.num >= 2) {
        this.page++
        this.reqdatas();
        this.num = 0
      }
    },
    changeindex1 () {
      this.$store.state.cataloglistsdata = [];
      this.min = ""
      this.max = ""
      this.page = 1
      this.index = 0;
      this.fonscolor();
      this.sanjiao1 = !this.sanjiao1
      if (this.sanjiao1) {
        this.order = "desc"
        this.reqdatas();
      } else {
        this.order = "asc";
        this.reqdatas();
      }
    },
    changeindex2 () {
      this.min = ""
      this.max = ""
      this.$store.state.cataloglistsdata = [];
      this.page = 1
      this.index = 1;
      this.fonscolor()
      this.sort = "last_update"
      this.reqdatas();
    },
    changeindex3 () {
      this.min = ""
      this.max = ""
      this.$store.state.cataloglistsdata = [];
      this.page = 1
      this.index = 2;
      this.fonscolor();
      if (this.sanjiao2 % 2) {
        this.sort = "shop_price"
        this.reqdatas();
      } else {
        this.sort = "sales_volume"
        this.reqdatas();
      }
      this.sanjiao2++
    },
    changeindex4 () {
      this.min = ""
      this.max = ""
      this.cid = 1105
      this.$store.state.cataloglistsdata = [];
      this.page = 1
      this.index = 3;
      this.fonscolor()
      console.log(this.cat_id);
      if (this.sanjiao3) {
        this.reqdatas();
        this.sanjiao3 = false;
      } else {
        this.sanjiao2 = !this.sanjiao2;
        if (this.sanjiao2) {
          this.order = "desc"
          this.reqdatas();
        } else {
          this.order = "asc"
          this.reqdatas();
        }
      }

    },
    changeindex5 () {

      console.log(112);
      this.show = !this.show
    },
    fonscolor () {
      var oactive = document.getElementsByClassName("active");
      for (var i = 0; i < oactive.length; i++) {
        oactive[i].style.color = "#ccc"
      }
      oactive[this.index].style.color = "red"
    },
    reqdatas () {
      let parmas = {
        url: "/api/catalog/goodslist",//接口地址
        parmas: {
          cat_id: this.cid,
          size: this.size,
          page: this.page,
          sort: this.sort,
          order: this.order,
          min: this.min,
          max: this.max,
          good_num: this.good_num
        },
        type: "post"
      };
      console.log(parmas);
      this.$store.dispatch("changecataloglistsdata", parmas)//调用store里面的actions方法
    }
  },
  mounted () {

    this.reqdatas()//获取数据
    this.fonscolor()
    console.log(this.categoryListDatas);
  },
}
</script>
<style lang="less">
.categorylist {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f6f6f9;
  .pq-enter,
  .pq-leave-to {
    transform: translateX(100%);
  }
  .pq-enter-active,
  .pq-leave-active {
    transition: all 0.5s;
  }
  .shaixuan {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #f6f6f9;
    h2 {
      line-height: 2.5rem;
      padding: 1rem;
      color: #333;
      width: calc(100% - 2rem);
      height: 2.5rem;
      font-size: 1.6rem;
      font-weight: normal;
      background-color: #fff;
    }
    .cuxiao {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      margin: 2rem 0;
      > span {
        box-sizing: border-box;
        float: left;
        width: 33.33%;
        padding-right: 1rem;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-bottom: 1rem;
        overflow: hidden;
        color: #666;
        background-color: #f7f7f7;
        border-radius: 3px;
        margin: 0 1.5rem;
        font-size: 1.4rem;
      }
    }
    .price {
      display: block;
      line-height: 2rem;
      font-size: 1rem;
      color: #333;
      height: 11rem;
      h3 {
        height: 2rem;
        overflow: hidden;
        font-size: 1.6rem;
        text-overflow: ellipsis;
        border-bottom: 1px solid #ccc;
        padding: 1rem;
        line-height: 2rem;
        color: #666;
        font-weight: normal;
      }

      > div {
        background-color: #fff;
        height: 5rem;
        padding: 1rem;
        width: calc(100% - 2rem);
        input {
          padding: 13px 15px;
          text-align: center;
          border-radius: 3px;
          font-size: 14px;
          color: #333;
          background-color: #f7f7f7;
          border: 0;
          padding: 0;
          margin-right: 1rem;
        }
      }
    }
    .pinpai {
      width: calc(100% - 3rem);
      height: 2.4rem;
      padding: 1.3rem 1.5rem;
      color: #333;
      display: block;
      margin-top: 2rem;
      p {
        float: left;
        line-height: 2.4rem;
      }
      span {
        float: right;
        line-height: 2.4rem;
      }
    }
    .shaixuanfooter {
      padding: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4.9rem;
      border-bottom: 1px solid #ccc;
      text-align: center;
      line-height: 4.9rem;
      font-size: 1.8rem;
      div {
        width: 50%;
        float: left;
        height: 100%;
      }
      .red {
        background-color: red;
        color: #fff;
      }
    }
  }
  div {
    > div {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      height: 3rem;
      background-color: #fff;
      padding: 0.8rem 0;
      span {
        width: 10%;
        display: block;
        text-align: center;
        line-height: 3rem;
        font-size: 1.6rem;
        color: #ccc;
      }
      div {
        width: 80%;
        padding: 0;
        position: relative;
        input {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 1.5rem;
          outline: 0;
          margin: 0 auto;
        }
        i {
          position: absolute;
          top: 0;
          right: 1rem;
          color: #ccc;
          font-size: 1.6rem;
        }
      }
      i {
        width: 10%;
        text-align: center;
        line-height: 3rem;
        color: #ccc;
      }
    }
    ul {
      width: 100%;
      height: 3.4rem;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: flex-start;
      align-content: center;
      background-color: #fff;
      .active {
        color: red;
      }
      li {
        width: 20%;
        height: 3.4rem;
        text-align: center;
        line-height: 3.4rem;
        overflow: hidden;
        margin: 0;
        font-size: 1.2rem;
      }
    }
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: wrap row;
    .li {
      width: calc(100% - 1.6rem);
      padding: 0.8rem;
      img {
        width: 9rem;
        height: 9rem;
        float: left;
      }
    }
    li {
      width: calc(50% - 0.3rem);
      background-color: #fff;
      margin: 0.6rem 0.3rem 0 0;
      img {
        width: 17.2rem;
        height: 17.2rem;
        display: block;
        margin: 0 auto;
      }
      h4 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 1.4rem;
        height: 3.8rem;
        line-height: 1.9rem;
        font-family: inherit;
        font-weight: 500;
        color: #333;
      }
      > span {
        display: block;
        font-size: 16px;
        font-weight: 500;
        color: rgb(242, 14, 40);
        padding: 6px 0px 8px;
      }
      div {
        height: 2rem;
        line-height: 2rem;
        .span1 {
          color: red;
          font-size: 1.3rem;
          float: left;
          margin: 0 1rem;
        }
        .span2 {
          color: #999;
          font-size: 1.2rem;
          float: left;
        }
        i {
          float: right;
          color: red;
        }
      }
    }
  }
}
</style>