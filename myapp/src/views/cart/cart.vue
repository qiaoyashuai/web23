<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='cart'>
    <header>
      <h2>购物车</h2>
    </header>
    <ul>
      <li
        v-for="(item,index) in cartdatas"
        :key="index"
      >
        <div
          class="radio"
          @click="danxuan(index)"
        >
          <i
            class="iconfont icon-yuangou"
            v-if="item.isSelect"
          ></i>
          <i
            class="iconfont icon-weibiaoti38"
            v-else
          ></i>
        </div>
        <div class="content">
          <div class="imgbox">
            <img
              :src="item.goods_thumb"
              alt=""
            >
          </div>
          <div class="imgright">
            <p>
              {{item.goods_name}}
            </p>
            <div class="datas">
              <span>
                {{item.shop_price}}
              </span>
              <div class="icon">
                <i class="iconfont icon-xin"></i>
                <i
                  class="iconfont icon-shanchu"
                  @click="removefn(index)"
                ></i>
              </div>
              <div class="input">
                <a
                  href="javaScript:;"
                  @click.stop="lessvalues(index)"
                >-</a>
                <input
                  type="text"
                  v-model.number="item.values"
                  @cloak.stop
                >
                <a
                  href="javaScript:;"
                  @click.stop="addvalues(index)"
                >+</a>
              </div>

            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="allmoney">
      <div
        class="quanxuan"
        @click="quanxuanfn"
      >
        <i
          class="iconfont  icon-yuangou"
          v-if="quanxuannum"
        ></i>
        <i
          class="iconfont icon-weibiaoti38"
          v-else
        ></i>
        <span>全选</span>
      </div>
      <div class="heji">
        <p>合计: <span>{{allpricve.toFixed(2)}}</span> </p>
        <h6>(不含运费,已节省(￥10))</h6>
      </div>
      <div class="jiesuan">
        <button>去结算({{productsnum}})</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Footer from "../../components/footer"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Footer },
  data () {
    //这里存放数据
    return {
      // quanxuan: true,
    };
  },
  //监听属性 类似于data概念
  computed: {
    quanxuannum () {
      var aaa = this.cartdatas.every((item) => {
        return item.isSelect
      });
      this.$store.commit("quanxuannum", aaa)
      return this.$store.state.quanxuannum
    },
    cartdatas () {
      return this.$store.state.cartDatas
    },
    allpricve () {
      let allpricve = 0;
      this.cartdatas.map((item) => {
        if (item.isSelect) {
          console.log(Number(item.shop_price.substr(1)));
          allpricve += Number(item.shop_price) * item.values
        }
      });
      return allpricve
    },
    productsnum () {
      let productsnum = 0;
      this.cartdatas.map((item) => {
        if (item.isSelect) {
          productsnum += item.values
        }
      });
      return productsnum
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    removefn (index) {
      this.cartdatas.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cartdatas))
    },
    quanxuanfn () {
      if (this.quanxuannum) {
        this.cartdatas.map((item) => [
          item.isSelect = false
        ])
      } else {
        this.cartdatas.map((item) => [
          item.isSelect = true
        ])
      }
    },
    danxuan (index) {
      // this.xuanzhong = !this.xuanzhong
      this.cartdatas[index].isSelect = !this.cartdatas[index].isSelect
      localStorage.setItem("cart", JSON.stringify(this.cartdatas))
    },
    addvalues (index) {
      this.cartdatas[index].values++;
      localStorage.setItem("cart", JSON.stringify(this.cartdatas))
    },
    lessvalues (index) {
      if (this.cartdatas[index].values > 1) {
        this.cartdatas[index].values--;
        localStorage.setItem("cart", JSON.stringify(this.cartdatas))
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    console.log(this.cartdatas);
  },
}
</script>
<style  lang="less">
.icon-yuangou {
  color: red;
}
.cart {
  width: 100%;
  height: 100%;
  background-color: #fff;
  header {
    h2 {
      width: 100%;
      height: 5rem;
      text-align: center;
      line-height: 5rem;
      font-size: 2.4rem;
      font-weight: normal;
      border-bottom: 1px solid #ccc;
    }
  }
  > ul {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    li {
      width: 100%;
      height: 10rem;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-content: center;
      .radio {
        width: 10%;
        font-size: 1.6rem;
        text-align: center;
        height: 10rem;
        line-height: 10rem;
      }
      .content {
        width: 90%;
        height: 7rem;
        margin-top: 1.5rem;
        // line-height: 10rem;
        display: flex;
        justify-content: center;
        align-content: center;
        .imgbox {
          margin-top: 1.5rem;
          width: 7rem;
          height: 7rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .imgright {
          width: calc(100% - 10rem);
          margin: 0 auto;
          p {
            width: 100%;
            font-size: 1.2rem;
            height: 4rem;
            line-height: 2rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .datas {
            width: 100%;
            height: 2.4rem;
            margin-top: 0.5rem;
            span {
              font-size: 1.8rem;
              display: block;
              float: left;
              color: #f44;
              &::before {
                content: "$";
              }
            }
          }
          .input {
            width: 8.6rem;
            height: 2.4rem;
            display: block;
            float: right;
            a {
              display: inline-block;
              width: 2rem;
              height: 2rem;
              background: #efefef;
              text-align: center;
              line-height: 2rem;
              border: 1px solid #efefef;
            }
            input {
              text-align: center;
              width: 3rem;
              height: 2.2rem;
              border: 0.1rem solid #ccc;
              outline: none;
            }
          }
          .icon {
            display: block;
            float: right;
            font-size: 1.6rem;
            i {
              margin: 0 0.5rem;
            }
          }
        }
      }
    }
  }
}
.allmoney {
  width: 35.5rem;
  height: 4.5rem;
  margin: 0 auto;
  display: flex;
  position: fixed;
  bottom: 5rem;
  left: 1rem;
  .quanxuan {
    width: 20%;
    height: 4.5rem;
    text-align: center;
    line-height: 4.5rem;
    font-size: 1.6rem;
  }
  .heji {
    width: 50%;
    height: 4.5rem;
    text-align: right;
    p {
      span {
        color: red;
        font-size: 2.4rem;
        &::before {
          content: "￥";
        }
      }
    }
    h6 {
      font-weight: normal;
      font-size: 1.2rem;
      color: #666;
    }
  }
  .jiesuan {
    width: 30%;
    height: 4.5rem;
    button {
      width: 100%;
      height: 4.5rem;
      border: 0;
      color: #fff;
      background-color: red;
      text-align: center;
    }
  }
}
</style>