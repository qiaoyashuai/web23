<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='cartalog'>
    <!-- <loading v-if="flag" /> -->
    <cataheader />
    <div class='catacontentbox'>
      <div class="cataleft">
        <ul
          v-for="(list,index) in catalogleft"
          :key="index"
        >
          <li>
            <p
              :class="{liactive:(active)==index}"
              @click="clickfn(index,list.cat_id)"
            > {{list.cat_name}}</p>
          </li>
        </ul>
      </div>
      <div class="catarightbox">
        <div
          class="catarightbox"
          id="catarightbox"
        >
          <div
            class="cataright"
            id="cataright"
          >
            <div class="imgbox">
              <img
                :src="bgimg[active]"
                alt=""
              >
            </div>
            <div
              class="itembox"
              v-for="(item,index) in catalogright"
              :key="index"
            >
              <div class="item">
                {{item.cat_name}}
              </div>
              <ul>
                <li
                  v-for="(list,kk) in item.child"
                  :key="kk"
                >
                  <router-link
                    :to="/categorylist/+list.cat_id"
                    @click="changelisys"
                  >
                    <img
                      :src="list.touch_icon"
                      alt=""
                    >
                    <span>{{list.cat_name}}</span>
                  </router-link>
                </li>
              </ul>

            </div>
            <div style="height: 20rem;"></div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "../../components/footer"
import cataheader from "./commponents/cataheader"
// import catacontent from "./commponents/catacontent"
// import loading from "../../components/loading
import betterScroll from "better-scroll";//引入插件
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Footer, cataheader },
  data () {
    //这里存放数据
    return {
      prolists: [],//存放左边的数据
      active: 0,//存放索引
      bgimg: [],
      // apiarr: ["/api/catalog/list/858", "/api/catalog/list/6", "/api/catalog/list/8", "/api/catalog/list/3", "/api/catalog/list/4", "api/catalog/list/5", "/api/catalog/list/860"],//右边数据的接口
      arrlists: [],//是一个
    };
  },
  //监听属性 类似于data概念
  computed: {
    catalogleft () {
      var arr = this.$store.state.catalogLeftdata;
      arr.forEach((element, index) => {
        this.bgimg.push(arr[index].touch_catads)
      });
      return this.$store.state.catalogLeftdata;//从状态管理中拿取,左边数据
    },
    catalogright () {
      // console.log(1561651561);
      console.log(this.$store.state.catalogRightdata);
      return this.$store.state.catalogRightdata;//从状态管理中获取右侧数据
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changelisys () {//清除商品详情页数据
      this.$store.state.cataloglistsdata = []
      console.log(this.$store.state.cataloglistsdata);
    },
    clickfn (index, cat_id) {
      this.active = index;
      // this.getgoods(this.apiarr[index], this.active)//点击时替换接口 给goods重新赋值
      // this.bgimg = this.prolists[index].touch_catads;
      this.cat_id = cat_id;
      // console.log(this.catalogright);//拿取右侧数据
      this.$store.dispatch("catalogRightdata", cat_id);//为状态管理中数据重新赋值
      // console.log(this.$store.state.catalogRightdata);
    },
    getdatas () {//获取左边接口中的数据
      this.$store.state.catalogLeftdata = []
      let parmas = {
        url: "/api/catalog/list",//左侧数据接口地址
        parmas: {},
        type: "get"
      }
      console.log(parmas);
      this.$store.dispatch("catalogLeftdata", parmas)
    },
    scrollpage () {
      this.rightScroll = new betterScroll("#catarightbox", {
        pullUpLoad: true,
        scrollbar: false,
        pullDownRefresh: true,
        click: true, //解决阻止默认行为的问题
      });
      console.log(this.rightScroll);
    }
  },
  mounted () {
    this.getdatas();//获取左边的组件使用的数据
    this.clickfn(0, 858)//页面刚开始加载时初始化显示的数据
    this.$store.state.cataloglistsdata = [];//清除商品详情页数据
    this.scrollpage()

  },
  updated () {
    console.log(document.getElementsByClassName("cataright")[0].scrollHeight);
  },
}
</script>
<style lang="less" scoped>
html,
body {
  background-color: #fff;
}
.cartalog {
  width: 100%;
  // height: 600rem;
  background-color: #fff;
  // overflow: hidden;
}
.catacontentbox {
  width: 100%;
  margin-top: 5.3rem;
  position: absolute;
  top: 0rem;
  left: 0;
  .cataleft {
    width: 8.5rem;
    float: left;
    ul {
      width: 8.4rem;
      li {
        width: 100%;
        height: 3.8rem;
        p {
          width: 100%;
          font-size: 1.3rem;
          color: #999;
          text-align: center;
          margin-top: 0.9rem;
          height: 2rem;
          line-height: 2rem;
          box-sizing: content-box;
        }
      }
      .liactive {
        color: red;
        border-left: 0.25rem solid red;
      }
    }
  }
  .cataright::-webkit-scrollbar {
    display: none;
  }
  .catarightbox {
    width: 29rem;
    height: 56.5rem;
    overflow-y: hidden;

    .cataright {
      // width: 100%;
      // height: 150rem;
      // float: right;
      .imgbox {
        display: block;
        width: 26.8rem;
        height: 9.6rem;
        overflow: hidden;
        margin-top: 1.1rem;
        border-radius: 0.2rem;
        padding: 0 1.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .itembox {
        .item {
          width: 100%;
          height: 2.5rem;
          margin: 1.1rem 0;
          background: #fff;
          line-height: 2.5rem;
          text-align: center;
          overflow: hidden;
          color: #333;
        }
        ul {
          width: 100%;
          display: flex;
          flex-flow: wrap row;
          justify-content: flex-start;
          align-content: center;
          li {
            width: 33.333%;
            height: 8.2rem;
            margin-bottom: 2rem;
            text-align: center;
            img {
              display: block;
              width: 5.2rem;
              height: 5.2rem;
              margin: 0 auto;
            }
            span {
              display: block;
              height: 2rem;
              line-height: 2rem;
              overflow: hidden;
              text-align: center;
              font-size: 1.2rem;
              color: #777;
              margin-top: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>