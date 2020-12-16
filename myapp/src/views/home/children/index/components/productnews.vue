<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="productnewsbox">
    <div class="productnews">
      <div class="imgbox">
        <img
          src="../images/002.png"
          alt
        />
      </div>
      <div class="oulbox">
        <ul
          id="oul"
          :class="{trans:flag}"
        >
          <li
            v-for="(item,index) in datas"
            :key="index"
          >{{item}}</li>
        </ul>
      </div>
      <span>
        <i class="iconfont icon-xiangyou"></i>
      </span>
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
      oul: null,
      otime: null,
      otime2: null,
      flag: false,
      datas: [
        "服务店突破2000多家",
        "我们成为中国最大家电零售B2B2C系统",
        "三大国际腕表品牌签约",
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changefn () {
      if (this.oul != null) {
        this.oul = document.getElementById("oul");
        // console.log("=============");
        this.oul.style.marginTop = "-3rem";
        this.flag = !this.flag;
        // 要注意箭头函数的this指向问题  
        let that = this
        this.otime2 = setTimeout(() => {
          that.datas.push(that.datas[0]);
          that.flag = !that.flag;
          that.datas.shift();
          that.oul.style.marginTop = "0";
        }, 500);
      }
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // this.changefn();
    this.oul = document.getElementById("oul");
    this.otime = setInterval(this.changefn, 2000);
  },
  destroyed () {
    this.otime = null;
    this.otime2 = null;
    // this.changefn = null
    console.log(this.oul);
    this.oul = document.getElementById("oul");
  },
};
</script>
<style lang="less" scoped>
.productnewsbox {
  width: calc(100% - 2rem);
  height: 3rem;
  margin: 1rem auto 0;
  overflow: hidden;
  .productnews {
    // width: calc(100%-2rem);
    height: 3rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .imgbox {
      width: 20%;
      height: 3rem;
      img {
        width: 100%;
      }
    }
    .oulbox {
      width: calc(70%-2rem);
      overflow: hidden;
      height: 3rem;
      float: left;
      .trans {
        transition: all 0.5s linear;
      }
      ul {
        li {
          height: 3rem;
          line-height: 3rem;
          width: 100%;
          font-size: 1.4rem;
        }
      }
    }
    span {
      i {
        width: 10%;
        font-size: 2.4rem !important;
        color: red;
      }
    }
  }
}
</style>