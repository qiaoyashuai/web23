<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="detail-page">
    <div
      class="detail-header"
      ref="header"
      :style="'background:#fff;'+'opacity:'+bgopacity"
    >
      <i
        class="iconfont icon-xiaoyuhao"
        onclick="window.history.back()"
      ></i>
      <div
        class="detail-tabs"
        style="opacity:1"
      >
        <ul>
          <li
            :class="{active:index==activenum}"
            v-for="(item,index) in headertitle"
            :key="index"
            @click="changeNavTabs(index)"
          >{{item}}</li>
        </ul>
      </div>
      <!-- 分享图标 -->
      <i
        class="iconfont icon-zhuanfafasong-3"
        @click="shareFn"
      ></i>
    </div>
    <!-- 转发微信生成海报 -->
    <!-- 分享蒙版 -->
    <div
      class="sharemask"
      v-show="sharemask"
      @click="sharemask=!sharemask"
    ></div>
    <!-- 分享内容 -->
    <div
      class="sharecontent"
      v-show="sharemask"
    >
      <div
        class="weixin"
        v-show="weixinshow"
        @click="sharefriends"
      >
        <i class="iconfont icon-zhuanfa-weixinhaoyou-"></i>
        <span>发送给好友</span>
      </div>
      <div
        class="haibao"
        @click="createposterfn();createcanvas()"
      >
        <i class="iconfont icon-haibao"></i>
        <span>生成海报</span>
      </div>
    </div>
    <div
      class="zhixiang"
      v-show="zhixiangshow"
      @click="zhixiangshow=!zhixiangshow"
    >
    </div>
    <!-- 生成的海报 -->
    <div
      class="postermask"
      v-show="createposter"
    >
      <div class="postercontnet">
        <div
          class="iconfontimg"
          @click="createposter=false"
        >
          <!-- 把img中的路径设置成画布 -->
          <img
            src="./images/poster-close.png"
            alt=""
          >
        </div>
        <img
          :src="posterImage"
          alt=""
        >
        <!-- <p>
          {{poster.title}}
        </p> -->
        <!-- <div class="posterprice">
          <h3><span>优惠价:</span>${{poster.newprice}}</h3>
          <h4><span>原价:</span>${{poster.oldprice}}</h4>
        </div> -->
        <div class="posterbottom">
          <h4>长按图片保存到手机</h4>
        </div>
      </div>
      <!-- 画布 -->
      <div class="hidecanvas">
        <!-- 画布内容 然后把此画布内容 -->
        <canvas ref="canvas"></canvas>
      </div>
    </div>
    <!-- 详情页轮播图 -->
    <div
      class="detail-swiper"
      id="title0"
    >
      <mt-swipe
        :auto="2000"
        :show-indicators="true"
      >
        <mt-swipe-item
          v-for="(detailData,index) in detaillists.gallery_list"
          :key="index"
        >
          <img
            :src="detailData.img_url"
            alt
          />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 详情价格 -->
    <div class="w detail-price">
      <div class="price">{{detaillists.shop_price}}</div>
      <div class="dprice">{{detaillists.market_price}}</div>
    </div>
    <div class="w detail-title">{{detaillists.goods_name}}</div>
    <div class="w detail-sale-info">
      <span>累计销量{{detaillists.sales_volume}}</span>
      <span>库存{{detaillists.goods_number}}</span>
      <!-- <span>澳门{{detaillists.basic_info.city_name}}</span> -->
    </div>
    <div
      class="yixuan"
      @click="popupVisible=!popupVisible"
    >
      <span>地区{{sheng}}-{{shi}}-{{qu}}</span>
      <span class="iconfont icon-arr-right1"></span>
    </div>
    <div
      class="yixuan"
      @click="changeshowfn"
    >
      <span>已选1</span>
      <span class="iconfont icon-arr-right1"></span>
    </div>
    <!-- tab 切换 -->
    <div
      class="detail-tabs"
      id="title1"
    >
      <mt-navbar
        class="page-part"
        v-model="selected"
      >
        <mt-tab-item id="tab1">商品详情</mt-tab-item>
        <mt-tab-item id="tab2">规格参数</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <!-- 商品详情 -->
        <mt-tab-container-item id="tab1">
          <div v-html="detaillists.desc_mobile"></div>
        </mt-tab-container-item>
        <!-- 规格参数 -->
        <mt-tab-container-item id="tab2">
          <div class="guige">
            <table>
              <tr
                v-for="(item,index) in detaillists.attr_parameter"
                :key="index"
              >
                <td class="td1">{{item.attr_name}}</td>
                <td class="td2">{{item.attr_value}}</td>
              </tr>
            </table>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 购买数量弹窗 -->
    <div
      class="detail-mask2"
      :class="showfn?'showhide':''"
      @click="showfn=!showfn"
    ></div>
    <div
      class="detail-mask"
      :class="showfn?'showhide':''"
    >
      <div
        class="detail-goods-info"
        :class="!showfn?'trams':''"
      >
        <div class="detail-goods-wrap">
          <div class="img">
            <img
              :src="detaillists.goods_thumb"
              alt
            />
          </div>
          <div class="wrap">
            <div class="title">{{detaillists.goods_name}}</div>
            <div class="price">{{detaillists.shop_price}}</div>
            <div class="goods_number">库存：{{detaillists.goods_number}}</div>
          </div>
          <div class="close">
            <i class="iconfont icon-round_delete"></i>
          </div>
        </div>
        <div class="num-wrap">
          <div>数量</div>
          <div class="num">
            <a
              href="javascript:;"
              @click="lessbuyNum"
            >-</a>
            <input
              type="text"
              v-model.number="addnum"
            />
            <a
              href="javascript:;"
              @click="addbuyNum"
            >+</a>
          </div>
        </div>
        <div class="mask-footer">
          <div class="buy">立即购买</div>
          <div
            class="cart"
            @click="abcfn"
          >加入购物车</div>
        </div>
      </div>
    </div>
    <!-- 购买数量弹窗结束 -->
    <!-- 选择地区 -->
    <div class="city">
      <mt-popup
        v-model="popupVisible"
        position="bottom"
      >
        <div class="popBox">
          <!-- 顶部确定 -->
          <div class="popBoxheader">
            <span @click="popupVisible=!popupVisible">确定</span>
          </div>
          <!-- 城市的三级联动 -->
          <mt-picker
            :slots="slots"
            :visibleItemCount="visibleItemCount"
            @change="onValuesChange"
          ></mt-picker>
          <!-- visibleItemCount  显示的行数 -->
        </div>
      </mt-popup>
    </div>
    <!-- 评论 -->
    <div
      class="pinglun"
      id="title2"
    >
      商品评论
    </div>
    <!-- 详情页底部 -->
    <div class="detail-page-footer">
      <div>
        <i class="iconfont icon-dkw_xiaoxi"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="iconfont icon-shoucang"></i>
        <span>收藏</span>
      </div>
      <div
        class="cartclass"
        @click="toroutecart"
      >
        <i class="iconfont icon-gouwuche"></i>
        <em>{{cartnum}}</em>
        <a href="javaScript:;"> <span>购物车</span></a>
        <h6 v-show="showaddnum">{{addnum}}</h6>
      </div>
      <div
        class="toCart"
        @click="addcartnum"
      >加入购物车</div>
      <div class="toBuy">立即购买</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import citydatas from '../../assets/json/city.json'
import debounce from "lodash.debounce"//引入防抖模块
import { isweixin } from "../../utils/isWeixin"
// console.log(isweixin());
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据
    return {
      showaddnum: false,
      addnum: 1,//动画飘过的数字
      buyNum: 0,//该商品最终买了多少件
      zhixiangshow: false,
      activenum: 0,
      slots: [
        {
          values: Object.keys(citydatas),//省级数据
          flex: 1,//所占多余比例  弹性盒子中的内容
          className: 'slot1',//类名
          textAlign: 'right', //对齐方式
          defaultIndex: 0,//直接在里面使用不生效  需在外面在定义一次
        }, {
          divider: true,//分隔符标志
          content: '-',//显示文本
          className: 'slot2'//对应的solt 类名
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'left',
          // defaultIndex: 0,
        }, {
          divider: true,
          content: '-',//分隔符不记入sort 中
          className: 'slot4'
        }, {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'left',
          // defaultIndex: 0,
        }
      ],
      headertitle: ["商品", "详情", "评论"],
      visibleItemCount: 5,//显示的行数
      popupVisible: false,
      selected: "tab1",
      goods_id: 1025,
      showfn: false,
      sheng: "",
      shi: "",
      qu: "",
      bgopacity: 0,
      weixinshow: true,//分享微信  当为微信浏览器内核时显示 否则不显示
      sharemask: false,
      createposter: false,
      posterImage: "",
    };
  },
  //监听属性 类似于data概念
  computed: {
    detaillists () {//详情页数据
      return this.$store.state.detaillists;//获取状态管理中的数据
    },
    poster () {//存储画布内容的对象
      return this.$store.state.posterdatas;
    },
    cartnum () {//购物车的商品总数量
      return this.$store.getters.cartnum
    },
  },
  //监控data中的数据变化
  watch: {},

  //方法集合
  methods: {
    toroutecart () {
      // this.$router.push("/cart");
      console.log(464848);
      this.$router.push("/cart")
    },
    abcfn () {//加入购物车弹窗动画弹出的数字大小
      this.showfn = !this.showfn;
      this.showaddnum = true
      this.buyNum += this.addnum;
      setTimeout(() => {
        this.showaddnum = false;
        this.addnum = 1
      }, 1000)
      let panduantiaojian = this.$store.state.cartDatas.find((item) => {//item是指每一个数组中的元素
        if (item.goods_id == this.detaillists.goods_id) {
          item.values = this.buyNum;
          // console.log(item);
        }
        return item.goods_id == this.detaillists.goods_id
      });//当执行此方法时说明当前元素已经在本地存储中有了 不会重复添加
      // console.log(panduantiaojian);
      let datas = null
      if (!panduantiaojian) {//当执行此if条件中的内容时则证明购物车中并没有此数据
        datas = {
          goods_id: this.detaillists.goods_id,
          goods_name: this.detaillists.goods_name,
          shop_price: this.detaillists.shop_price,
          market_price: this.detaillists.market_price,
          goods_thumb: this.detaillists.goods_thumb,
          values: this.buyNum,
          isSelect: true,
        }
        // this.$store.commit("cartDatas", datas)
      }
      this.$store.commit("cartDatas", datas)
    },
    lessbuyNum () {
      if (this.buyNum > 1 && this.addnum > 1) {
        this.addnum--
        // this.$store.state.cartnum--
        // let data = this.$store.state.cartnum;
        // this.$store.commit("cartnum", data)
      }

    },
    addbuyNum () {
      this.addnum++
      // this.$store.state.cartnum++
      // let data = this.$store.state.cartnum;
      // this.$store.commit("cartnum", data)
    },
    addcartnum () {//添加购物车
      this.buyNum++
      this.showaddnum = true
      setTimeout(() => {
        this.showaddnum = false
      }, 1000)
      // this.$store.state.cartnum++
      // let data = this.$store.state.cartnum;
      // this.$store.commit("cartnum", data)
      //以上的内容是为了计算并控制购物车的总共的商品数量
      // .find()方法是为了查找数组中的某个元素 return为true则立马跳出循环 并且return为true
      let panduantiaojian = this.$store.state.cartDatas.find((item) => {//item是指每一个数组中的元素
        if (item.goods_id == this.detaillists.goods_id) {
          item.values = this.buyNum;
          // console.log(item);
        }
        return item.goods_id == this.detaillists.goods_id
      });//当执行此方法时说明当前元素已经在本地存储中有了 不会重复添加
      // console.log(panduantiaojian);
      let datas = null
      console.log(this.buyNum);
      if (!panduantiaojian) {//当执行此if条件中的内容时则证明购物车中并没有此数据
        datas = {
          goods_id: this.detaillists.goods_id,
          goods_name: this.detaillists.goods_name,
          shop_price: this.detaillists.shop_price,
          market_price: this.detaillists.market_price,
          goods_thumb: this.detaillists.goods_thumb,
          values: this.buyNum,
          isSelect: true,
        }
        // this.$store.commit("cartDatas", datas)
      }
      console.log(datas);
      this.$store.commit("cartDatas", datas)
    },
    //画布的方法
    canvasfn () {
      //第一步 获取dom元素
      let ocanvas = this.$refs.canvas;
      // 第二步 获取上下文  context相当于画笔
      var context = ocanvas.getContext('2d');
      console.log(context);
      // 给画布设置的宽高是为了用户下载的大小 不是在页面上显示的大小 因为下载以后是二倍的关系 在视图上需要设置scale缩放来显示大小适合屏幕
      let W = window.screen.availWidth;//给画布设置宽度  现实的宽度是这个的二倍
      let H = window.screen.availHeight;//给画布设置高度  现实的高度是这个的二倍
      // console.log(W);
      // console.log(H);
      let devicePixelRatio = window.devicePixelRatio || 1;//获取设备像素比
      console.log(devicePixelRatio);
      let webkitBackingStorePixelRatio = context.webkitBackingStorePixelRatio || 1;//使用这个属性是为了让图片清晰
      let ratio = devicePixelRatio / webkitBackingStorePixelRatio;//比例
      // ocanvas.width   ocanvas.height 和ocanvas.style.width ocanvas.style.height 不一样
      //前者是画布的实际大小  而后者是画布在浏览器上渲染的大小  如果前者没有则默认为和后者高度一样
      ocanvas.width = W * ratio;//给画布设置宽度
      ocanvas.height = H * ratio;//给画布设置高度 
      ocanvas.style.width = W * ratio + "px";
      ocanvas.style.height = H * ratio + "px";
      context.scale(ratio, ratio)//缩小比例
      console.log(ratio);
      console.log(webkitBackingStorePixelRatio);
      console.log(ocanvas);
      // getImageData() 方法 和 putImageData() 方法搭配使用
      // getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 将图像数据放回画布：
      var imgdata = context.getImageData(0, 0, ocanvas.width, ocanvas.height)//第一个第二个参数是复制的起始位置 第三个第四个参数是大小
      for (var i = 0; i < imgdata.data.length; i = i + 4) {
        imgdata.data[i] = 255;//给所有的像素点设置为白色
        imgdata.data[i + 1] = 255;
        imgdata.data[i + 2] = 255;
        imgdata.data[i + 3] = 255;
      }
      context.putImageData(imgdata, 0, 0)//得到一张白色的画布
      // console.log(imgdata);
      // 向画布中渲染图片
      var img = new Image();
      //this.poster.image // 必须是base64位格式 直接是图片的话会报错
      img.src = this.poster.image;
      img.onload = function () {
        context.drawImage(img, 0, 0, W, W);
      }
      // 向画布中渲染文字 生成价格 商品简介
      // 商品简介
      context.font = "20px Arial"; //设置字体大小
      context.fillStyle = "#333333"; //设置字体的颜色
      context.textAlign = "center"; //设置文本的对齐方式
      context.fillText(this.poster.title, W / 2, W + 30);
      //生成价格
      context.font = "30px Arial"; //设置字体大小
      context.fillStyle = "#FF4444"; //设置字体的颜色
      context.textAlign = "center"; //设置文本的对齐方式
      context.fillText("￥" + this.poster.newprice, W / 2, W + 100);
      //生成二维码
      var img1 = new Image();
      // this.poster.image // 必须是base64位格式 直接是图片的话会报错
      img1.src = this.poster.code;
      img1.onload = function () {
        context.drawImage(img1, 100, W + 160, W / 3, W / 3);
      }
      //生成logo图标
      var img2 = new Image();
      // this.poster.image // 必须是base64位格式 直接是图片的话会报错
      img2.src = this.poster.logo;
      img2.onload = function () {
        context.drawImage(img2, 0, 0, 100, 50);
      }
      setTimeout(() => {
        this.posterImage = ocanvas.toDataURL();//使用定时器的原因是为了给页面加载时间防止加载不出来而不显示  将画布设置成图片地址形式来赋值给posterImage 在img标签中显示
      }, 500)
    },
    createcanvas () {//执行生成海报
      this.canvasfn()
    },

    createposterfn () {
      this.createposter = true;
      this.sharemask = false
    },
    sharefriends () {
      this.zhixiangshow = !this.zhixiangshow
      this.sharemask = !this.sharemask
    },
    shareFn () {
      this.sharemask = !this.sharemask
    },
    //此方法是城市的三级联动 滚动触发
    onValuesChange (picker, values) {//第二个参数是最终获取到的值  第一个参数为picker实例对象 
      // setSlotValue(1, )//设定给定 slot 被选中的值，该值必须存在于该 slot 的备选值数组中
      // console.log();
      // Object.keys() 此方法获取对象的所有属性并且获得一个数组
      picker.setSlotValues(1, Object.keys(citydatas[values[0]]))//给市级添加数据
      picker.setSlotValues(2, citydatas[values[0]][values[1]])//给县区添加数据
      // console.log(values);
      this.sheng = values[0];
      this.shi = values[1],
        this.qu = values[2]
    },
    changeshowfn () {
      this.showfn = true;
    },
    getdetaillists () {
      let parmas = {
        url: "/api/goods/show",
        parmas: {
          goods_id: this.goods_id
        },
        type: "post"
      }
      this.$store.dispatch("detaillists", parmas)
      // console.log(this.$store.state.detaillists);
    },
    changeopacity () {
      var top = document.documentElement.scrollTop || document.body.scrollTop//获取页面被卷进去的高度
      // console.log(top);
      var opacity = top / 200;
      opacity = opacity >= 1 ? 1 : opacity//大于1时等于1
      this.bgopacity = opacity
    },
    changeNavTabs (index) {//点击事件 点击使页面滑动
      this.$nextTick(() => {
        this.activenum = index;//改变样式  字体颜色变红
        let element = document.querySelector("#title" + this.activenum)//点击时获取元素
        // console.log(element);
        //scrollTop 元素被卷进去的高度 
        //scrollHeight 元素实际的高度 包括看不到的高度
        //clientHeight 元素的可视区域 就是人眼能看到的高度
        //clientLeft 是元素的左边框的值
        //offsetHeight 包括元素的border padding 内容高度
        //offsetTop  是元素距离父元素的顶部的距离  和滚动条无关
        // console.log(element.offsetTop);//元素距离父元素的顶部的距离 是一个定值
        // console.log(window.scrollY);//页面被卷进去的距离
        // console.log(this.$refs.header.offsetHeight);
        // let top =element.offsetTop
        let top = element.offsetTop - window.scrollY - this.$refs.header.offsetHeight
        window.scrollBy({ top: top, left: 0, behavior: "smooth" });//滚动指定距离behavior: "smooth" 添加该属性是为了让页面滚动能流畅动画进行
        // console.log(top);
      })
    },
    scrollpage: debounce(function () {
      const headerClient = this.$refs.header.offsetHeight;//获取头部的高度
      // console.log(headerClient);
      let titles = [];
      titles.push(document.querySelector("#title0"))
      titles.push(document.querySelector("#title1"));
      titles.push(document.querySelector("#title2"))
      // console.log(titles);
      let { scrollY } = window;//结构赋值
      titles.reduce((total, item, index) => {//第一个参数 是总的值 第二个参数是 每一个元素 第三个值是索引
        // console.log(total);
        // console.log(item);
        // console.log(index);
        if (!document.querySelector("#title0") &&
          !document.querySelector("#title1") &&
          !document.querySelector("#title2")) {
          return;//当获取不到元素时跳出循环
        }//不会跳出循环 都有
        if (total) {
          return total//当total存在时找到距离
        }
        // console.log(scrollY + headerClient);
        // console.log(item.offsetTop + item.offsetHeight);
        if (scrollY + headerClient < item.offsetTop + item.offsetHeight) {//scrollY是页面滚动的距离
          // offsetTop 距离父元素的偏移量 offsetHeight 自身的高度包括边框
          // console.log("efesfsefse");
          this.activenum = index;
          // console.log(this.activenum);
          total = true
        }
        return total
      }, false)
      // console.log(scrollY);//是页面卷进去的距离
    }, 500)
  },

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.goods_id = this.$route.params.goods_id;
    this.getdetaillists()
    this.$nextTick(() => {
      // console.log(122);
      this.slots[0].defaultIndex = 1;//使用时必须在sorts里面先定义一个 然后在在外面使用否则不生效
    });
    window.addEventListener("scroll", this.changeopacity, false)
    document.addEventListener("scroll", this.scrollpage, false)
    this.weixinshow = isweixin()
  },
}
</script>
<style lang="less">
.detail-page {
  height: 300rem;
  .detail-page-footer {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    display: flex;
    border-top: 1px solid #efefef;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      @keyframes moveaddnum {
        0% {
          opacity: 0;
          top: 0.5rem;
        }
        50% {
          opacity: 1;
          top: -2rem;
        }
        100% {
          opacity: 0;
          top: -2rem;
        }
      }
      h6 {
        font-size: 2rem;
        color: red;
        position: absolute;
        left: 1.5rem;
        animation: moveaddnum 1s linear;
      }
      i {
        font-size: 2.2rem;
      }
      em {
        position: absolute;
        min-width: 2rem;
        height: 2rem;
        background: red;
        color: #fff;
        text-align: center;
        line-height: 2rem;
        border-radius: 2rem;
        right: 0.5rem;
        top: -0.5rem;
        font-style: normal;
      }
    }
    .toCart {
      flex: 2;
      background: #f44;
      line-height: 5rem;
      color: #fff;
    }
    .toBuy {
      flex: 2;
      background: #ff976a;
      line-height: 5rem;
      color: #fff;
    }
  }
  .yixuan {
    height: 4.4rem;
    border-top: 1rem solid #efefef;
    border-bottom: 1rem solid #efefef;
    line-height: 4.4rem;
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 1rem;
      font-size: 1.4rem;
    }
  }
  .showhide {
    display: block !important;
  }
  .detail-mask2 {
    display: none;
    position: fixed;
    top: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
  }
  .detail-mask {
    position: fixed;
    bottom: 0;
    z-index: 999;
    background: transparent;
    width: 100%;
    // vh 视图高度
    .mask-footer {
      height: 5rem;
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      margin-left: -1rem;
      div {
        flex: 1;
        line-height: 5rem;
        text-align: center;
        font-size: 1.4rem;
        color: #fff;
      }
      .buy {
        background: #fba534;
      }
      .cart {
        background: #f92028;
      }
    }
    .trams {
      transform: translateY(40vh);
    }
    .detail-goods-info {
      transition: all 0.5s;
      height: 30vh;
      background: #fff;
      position: absolute;
      bottom: 0;
      padding: 1rem;
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      width: calc(100% - 2rem);
      .num-wrap {
        width: 100%;
        height: 4.4rem;
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        .num {
          display: flex;
          a {
            display: block;
            width: 3rem;
            height: 3rem;
            background: #efefef;
            text-align: center;
            line-height: 3rem;
            font-size: 1.4rem;
          }
          input {
            height: 3rem;
            border: 1px solid #efefef;
            box-sizing: border-box;
            width: 6rem;
            text-align: center;
          }
        }
      }
      .detail-goods-wrap {
        width: 100%;
        display: flex;
        .img {
          width: 30%;
          position: relative;
          img {
            width: 9rem;
            height: 9rem;
            position: absolute;
            top: -3rem;
            border-radius: 1rem;
          }
        }
        .wrap {
          width: 60%;
          .title {
            height: 4rem;
            line-height: 2rem;
            overflow: hidden;
            font-size: 1.4rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .price {
            font-size: 1.8rem;
            line-height: 3rem;
            color: red;
          }
          .goods_number {
            font-size: 1.2rem;
            color: #666;
          }
        }
        .close {
          width: 10%;
          text-align: right;
        }
      }
    }
  }
  .detail-sale-info {
    justify-content: space-between;
    font-size: 1.2rem;
  }
  .detail-title {
    font-size: 1.4rem;
    line-height: 2.4rem;
  }
  .w {
    width: 100%;
    margin: 1rem;
    width: calc(100% - 2rem);
    display: flex;
  }
  .detail-price {
    height: 4.4rem;
    line-height: 4.4rem;
    div {
      font-weight: bold;
      &::before {
        content: "￥";
      }
    }
    .price {
      font-size: 1.8rem;
      color: red;
    }
    .dprice {
      text-decoration: line-through;
      color: #666;
      font-size: 1.2rem;
      margin-left: 2rem;
    }
  }
  .detail-header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    height: 4.4rem;
    width: 100%;
    line-height: 4.4rem;
    justify-content: space-between;
    font-size: 1.4rem;
    z-index: 99;
    i {
      width: 15%;
      display: block;
      text-align: center;
    }
    .detail-tabs {
      width: 70%;
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
        }
        .active {
          color: red;
          border-bottom: 0.2rem solid red;
          height: 4.2rem;
        }
      }
    }
  }

  .detail-swiper {
    width: 100%;
    height: 37.5rem;
    img {
      width: 100%;
      height: 37.5rem;
    }
  }
}
.detail-tabs {
  // tabnav
  // .detail-tabs {
  // }
  // nav内容区域
  // 规格参数
  .guige {
    table {
      margin-left: 1.5rem;
      width: calc(100% - 1.5rem);
      box-sizing: border-box;
      border: 0.1rem solid #ccc;
      border-collapse: collapse;
      background-color: #fff;
      tr {
        width: 100%;
        td {
          box-sizing: border-box;
          border: 0.1rem solid #ccc;
          line-height: 3rem;
          font-size: 1.2rem;
          color: #000;
        }
        .td1 {
          padding: 0 0 0 1rem;
          width: calc(20% - 1rem);
          height: 3.1rem;
        }
        .td2 {
          width: 80%;
          text-indent: 1rem;
        }
      }
    }
  }
}
.city {
  .mint-popup {
    width: 100%;
    .popBox {
      width: 100%;
      .popBoxheader {
        width: 100%;
        line-height: 4.4rem;
        span {
          float: right;
          width: 4.4rem;
          display: block;
          height: 4.4rem;
          text-align: center;
          background-color: #ccc;
        }
      }
    }
  }
}
.img {
  img {
    width: 100%;
  }
}
.pinglun {
  width: 35.5rem;
  height: 100rem;
  margin: 0 auto;
  background-color: red;
}
// 分享模块
.sharemask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
}
.sharecontent {
  width: 100%;
  height: 8rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-content: center;
  div {
    width: 50%;
    text-align: center;
    i,
    span {
      display: block;
    }
    i {
      color: #80d640;
      font-size: 3.2rem;
      margin-top: 1.5rem;
    }
    span {
      font-size: 1.6rem;
    }
  }
}
.zhixiang {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background: url("./images/share-bg.png") no-repeat center;
  background-size: 100% 100%;
}
.postermask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  .postercontnet {
    width: 70%;
    height: 70%;
    margin: 0 auto;
    margin-top: 15%;
    background-color: #fff;
    position: relative;
    top: 0;
    left: 0;
    .iconfontimg {
      img {
        height: 3rem;
      }
      position: absolute;
      top: -3rem;
      right: 0;
    }
    > img {
      width: 100%;
      height: 100%;
    }
    p {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 1.6rem;
      line-height: 2.5rem;
    }
    .posterprice {
      width: 100%;
      h3 {
        margin-top: 1rem;
        font-size: 1.6rem;
        color: red;

        span {
          color: #333;
          margin-right: 1rem;
        }
      }
      h4 {
        text-decoration: line-through;
        font-size: 1.4rem;
        span {
          color: #333;
          margin-right: 3rem;
        }
      }
    }
    .posterbottom {
      width: 100%;
      height: 4rem;
      color: #fff;
      // background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: -4rem;
      h4 {
        width: 100%;
        line-height: 4rem;
        text-align: center;
        font-size: 1.6rem;
        text-shadow: 1rem 0rem 1rem #000;
      }
    }
  }
}
.hidecanvas {
  display: none;
}
</style>