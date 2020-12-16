<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='loadbox'>
    <div class="loadboxtop">
      <ul>
        <li
          v-for="(item,index) in tabdatas"
          :key="index"
        >
          <p>{{item.name}}</p>
          <span
            :class="{red:flag==index,}"
            @click="changeactive(index,page)"
          >{{item.title}}</span>
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
        v-for="(list,index) in lists"
        :key="index"
      >
        <div class="imgbox">
          <img
            :src="list.goods_img"
            alt=""
            v-if="num!=1"
          >
          <img
            :src="list.img"
            alt=""
            v-else
          >
        </div>
        <div class="contentbox">

          <div v-if="num!=1">
            {{list.title}}
          </div>
          <div v-else>
            {{list.goods_name}}
          </div>
          <p v-if="num!=1">
            {{list.shop_price_formated}}
          </p>
          <p
            v-else
            class="flexbox"
          >
            <img
              :src="list.user_picture"
              alt=""
            >
            <span>{{list.user_name}}</span>
            <a>
              <i class="iconfont icon-yanjing"></i>{{list.dis_browse_num}}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios"
////api/goods/type_list?page=1&size=10&type=is_best  第一个接口
///api/discover/find_list?size=10&page=1  第二个接口
// /api/goods/type_list?page=1&size=10&type=is_new 第三个接口
// /api/goods/type_list?page=1&size=10&type=is_hot 第四个接口
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      num: 0,
      flag: 0,
      page: 1,
      size: 10,
      url: '',
      tabdatas: [{
        name: "精选",
        title: "为你推荐",
        listurl: '/goods/type_list',
        listtype: "is_best"
      }, {
        name: "社区",
        title: "新奇好物",
        listurl: '/discover/find_list',
        listtype: ""
      }, {
        name: "新品",
        title: "潮流上新",
        listurl: '/goods/type_list',
        listtype: "is_new"
      }, {
        name: "热卖",
        title: "火热爆款",
        listurl: '/goods/type_list',
        listtype: "is_hot"
      },],
      lists: [],
      urlaaa: '',
      disblc: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  },
  //方法集合
  methods: {
    fn () {
      // console.log(this.disblc);
      this.$emit("totoparent", this.disblc)
    },
    loadMore () {
      // console.log(111); 可以使用
      this.changeactive(this.num, this.page);
      this.page++
    }
    ,
    changeactive (index, page) {//点击事件 调用productlist事件来调换接口获得不同的数据

      if (this.num != index) {
        page = 1;
        // console.log(1132525642664264);
        this.lists = []; this.num = index;
      }
      // page = 0
      // console.log(this.num);
      this.flag = index;
      let url = "/api";
      // console.log(index);
      let list = this.tabdatas[index];
      // console.log(list);
      // 拼接url
      url = url + list.listurl + "?" + "page=" + page + "&size=" + this.size + "&type=" + list.listtype;
      // console.log(url);
      // console.log(this.urlaaa);
      if (this.urlaaa == url) {
        return
      } else {
        this.urlaaa = url;
      }

      // console.log(url);
      this.productlist(url)
    },
    productlist (url) {
      axios.get(url).then((res) => {
        // console.log(this.lists);
        // console.log(res);
        this.disblc = true;
        console.log(this.disblc);
        this.fn()
        this.disblc = false;
        let resarr = res.data.data;
        if (resarr) {
          console.log("+++++++++++++++++++++++");
          this.disblc = false;
          this.fn()
        }
        // console.log(resarr);
        this.lists = this.lists.concat(resarr)
        // console.log(this.lists);
        console.log(this.lists);
        // console.log(url);
      })
    }

  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.changeactive(0, 1);

  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
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