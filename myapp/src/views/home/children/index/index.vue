<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="index">
    <topfxi />
    <loading v-if="showfn" />
    <swipe @transdata="getdata" />
    <div
      class="bg"
      id="bg"
    ></div>
    <swipeproducts />
    <productnews />
    <div class="bigimg">
      <img
        src="./images/003.png"
        alt
      />
    </div>
    <xianshi />
    <pintuna />
    <div class="loadbox">
      <div class="loadboxtop">
        <ul>
          <li
            v-for="(item, index) in tabdatas"
            :key="index"
          >
            <p>{{ item.name }}</p>
            <span
              :class="{ red: flag == index }"
              @click="changeactive(index, page)"
            >{{ item.title }}</span>
          </li>
        </ul>
      </div>
      <div
        class="content"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <div
          v-for="(list, index) in lists"
          :key="index"
        >
          <div class="imgbox">
            <img
              :src="list.goods_img"
              alt=""
              v-if="num != 1"
            />
            <img
              :src="list.img"
              alt=""
              v-else
            />
          </div>
          <div class="contentbox">
            <div v-if="num != 1">
              {{ list.title }}
            </div>
            <div v-else>
              {{ list.goods_name }}
            </div>
            <p v-if="num != 1">
              {{ list.shop_price_formated }}
            </p>
            <p
              v-else
              class="flexbox"
            >
              <img
                :src="list.user_picture"
                alt=""
              />
              <span>{{ list.user_name }}</span>
              <a>
                <i class="iconfont icon-yanjing"></i>{{ list.dis_browse_num }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import swipe from "./components/swipe"; //需要从swipe组件传递数据到home组件中 向父元素传递数据
import swipeproducts from "./components/swipeproduct";
import productnews from "./components/productnews";
import xianshi from "./components/xianshi";
import pintuna from "./components/pintuan";
import axios from "axios";
// import loadfooter from "./components/loadfooter"
import loading from "../../../../components/loading";
import topfxi from "./components/topfix";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    swipeproducts,
    swipe,
    productnews,
    xianshi,
    pintuna,
    loading,
    topfxi,
  },
  data () {
    //这里存放数据
    return {
      // topfixshow: false,
      obox: null,
      oindex: 0,
      ocolor: ["#E22F2A", "#FF5C3D", "#1164F1", "#00978D", "#2E66D6"],
      showfn: false,
      num: 0,
      flag: 0,
      page: 1,
      size: 10,
      url: "",
      tabdatas: [
        {
          name: "精选",
          title: "为你推荐",
          listurl: "/goods/type_list",
          listtype: "is_best",
        },
        {
          name: "社区",
          title: "新奇好物",
          listurl: "/discover/find_list",
          listtype: "",
        },
        {
          name: "新品",
          title: "潮流上新",
          listurl: "/goods/type_list",
          listtype: "is_new",
        },
        {
          name: "热卖",
          title: "火热爆款",
          listurl: "/goods/type_list",
          listtype: "is_hot",
        },
      ],
      lists: [],
      urlaaa: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getdata (data) {
      this.oindex = data;
      document.getElementsByClassName(
        "bg"
      )[0].style.backgroundColor = this.ocolor[data];
      // console.log(document.getElementsByClassName("navbox")[0]);
      document.getElementsByClassName(
        "navbox"
      )[0].style.backgroundColor = this.ocolor[data];
      document.getElementsByClassName(
        "home-header"
      )[0].style.backgroundColor = this.ocolor[data];
    },
    loadMore () {
      // console.log(111); 可以使用
      this.changeactive(this.num, this.page);
      this.page++;
    },
    changeactive (index, page) {
      //点击事件 调用productlist事件来调换接口获得不同的数据

      if (this.num != index) {
        page = 1;
        // console.log(1132525642664264);
        this.lists = [];
        this.num = index;
      }
      // page = 0
      // console.log(this.num);
      this.flag = index;
      let url = "/api";
      // console.log(index);
      let list = this.tabdatas[index];
      // console.log(list);
      // 拼接url
      url =
        url +
        list.listurl +
        "?" +
        "page=" +
        page +
        "&size=" +
        this.size +
        "&type=" +
        list.listtype;
      // console.log(url);
      // console.log(this.urlaaa);
      if (this.urlaaa == url) {
        return;
      } else {
        this.urlaaa = url;
      }
      // console.log(url);
      this.productlist(url);
    },
    productlist (url) {
      this.showfn = true;
      axios.get(url).then((res) => {
        let resarr = res.data.data;
        if (res.data) {
          this.showfn = false;
        }
        // console.log(resarr);
        this.lists = this.lists.concat(resarr);
      });
    },
    scolltop () {
      // console.log(document.documentElement.scrollTop);
      let otop = document.documentElement.scrollTop;
      this.obox = document.getElementsByClassName("topfix")[0];
      if (this.obox) {
        if (otop >= 200) {
          // console.log(document.getElementsByClassName("topfix")[0]);
          this.obox.style.top = "0";
          // this.topfixshow = true;
          // .style.transition = "all 0.5s"
        } else {
          // console.log(document.getElementsByClassName("topfix")[0]);
          this.obox = document.getElementsByClassName("topfix")[0];
          this.obox.style.top = "-8.7rem";
          // this.topfixshow = false;
        }
      } else {
        return;
      }
    },
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    window.addEventListener("scroll", this.scolltop);
  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.topfix {
  transition: all 5s;
}
.index {
  width: 100%;
  height: 100%;
}
.bg {
  background-color: #e22f2a;
  width: 100%;
  height: 14rem;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 9;
  margin-top: -35rem;
  border-bottom-right-radius: 3rem;
  border-bottom-left-radius: 3rem;
}
.bigimg {
  width: calc(100%-2rem);
  height: 150pxx;
  padding: 1rem;
  img {
    width: 100%;
  }
}
.loadbox {
  width: calc(100% - 2rem);
  height: 30rem;
  margin: 0 auto;
  .loadboxtop {
    width: 100%;
    height: 4rem;
    // padding: 1rem 0;
    margin-bottom: 2rem;
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      li {
        width: 25%;
        height: 4.2rem;
        text-align: center;
        border-right: 0.1rem solid #ccc;
        box-sizing: border-box;
        p {
          width: 100%;
          font-size: 1.6rem;
          color: #000;
          font-weight: 600;
          line-height: 2.1rem;
        }
        span {
          width: 68%;
          font-size: 1.2rem;
          line-height: 1.9rem;
          color: #888;
          padding: 0 1rem;
          display: block;
          margin: 0 auto;
          padding: 0.2rem;
          // margin-top: 0.4rem;
        }
        .red {
          background-color: red;
          color: #fff;
          // margin-top: 0.4rem;
          border-radius: 1rem;
        }
      }
    }
  }
  .content {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: wrap row;
    justify-content: space-between;
    align-content: center;
    > div {
      width: 17.2rem;
      height: 27.3rem;
      background-color: #fff;
      margin-bottom: 0.88rem;
      .imgbox {
        width: 17.2rem;
        height: 17.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .contentbox {
        width: 14.2rem;
        height: 7.1rem;
        padding: 1.5rem;
        div {
          font-size: 1.5rem;
          color: #000;
          font-weight: 500;
          min-height: 4.2rem;
          -webkit-line-clamp: 2;
          line-height: 2.1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        p {
          font-size: 1.6rem;
          color: red;
          margin-top: 1rem;
        }
        .flexbox {
          // display: flex;
          line-height: 2.2rem;
          img {
            width: 2.2rem;
            height: 2.2rem;
            float: left;
          }
          span {
            color: #666 !important;
            font-size: 1.2rem;
            float: left;
          }
          a {
            float: right;
            font-size: 1.3rem;
            font-weight: 600;
            color: #ccc;
            line-height: 2.2rem;
            i {
              font-size: 1.6rem;
            }
          }
        }
      }
    }
  }
}
</style>
