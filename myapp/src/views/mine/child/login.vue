<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class='loginbox'>
    <div class="logincontent">
      <div class="imgbox">
        <img
          src="../images/01-wykd.png"
          alt=""
        >
      </div>
      <div class="frombox">
        <div
          class="tablogin"
          ref="tablogin"
        >
          <span
            class="active"
            @click="changeflag(0)"
          >短信登录</span>
          <span @click="changeflag(1)">账号登录</span>
        </div>
        <div
          class="form"
          v-if="flag!=1"
        >
          <!-- 短信登录 -->
          <div>
            <input
              type="text"
              name="captach"
              placeholder="请输入随机验证码"
              v-model="captcha"
            >
            <!-- captach 二维码的意思 -->
            <span @click="changesrc"><img
                ref="img"
                src="/adminapi/svgcaptcha"
                alt=""
              ></span>
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="请输入手机号"
              v-model.number="phone"
              maxlength="11"
            >
            <span
              v-if="!num"
              @click="getphonecode"
            >{{text}}</span>
            <span v-else>已发送{{num}}s</span>
          </div>
          <div>
            <input
              type="text"
              placeholder="验证码"
              name="captcha"
              v-model="code"
            >
            <span>输入手机号验证码</span>
          </div>
          <a
            href="javaScript:;"
            @click="phonelogin"
          >
            短信登录
          </a>
        </div>
        <!-- 账号密码登录 -->
        <div
          class="form"
          v-else
        >
          <div>
            <input
              type="text"
              placeholder="用户名"
              name="name"
              v-model="name"
            >
          </div>
          <div>
            <input
              type="text"
              placeholder="密码"
              name="password"
              v-model="password"
            >
          </div>
          <div>
            <input
              type="text"
              name="captach"
              placeholder="请输入随机验证码"
              v-model="captcha"
            >
            <!-- captach 的意思 -->
            <span @click="changesrc"><img
                ref="img"
                src="/adminapi/svgcaptcha"
                alt=""
              ></span>
          </div>
          <a
            href="javaScript:;"
            @click="zhanghao"
          >
            账号登录
          </a>
        </div>

        <p class="zhuce">没有账号立马注册</p>
      </div>
    </div>
  </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getphonecode, phonelogin } from "../../../api/api"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    //这里存放数据 
    return {
      flag: 0,
      timer: null,
      num: 0,
      text: "发送验证码",
      phone: "",
      code: '',
      captcha: '',
      password: '',
      name: ""
    };
  },
  //监听属性 类似于data概念
  computed: {
    yanzheng () {

      console.log(this.phone);
      return /^1[3|5|6|8][0-9]{9}$/.test(this.phone);
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //账号密码登录 
    async zhanghao () {
      var params = {
        name: this.name,
        password: this.password,
      };
      let result = await phonelogin("/adminapi/login", params, "post");
      console.log(result);
      if (result.status == 200) {
        this.$store.commit("userInfo", result.token)
        this.$router.push("/home/index")
      }
    },
    async phonelogin () {
      //短信登录
      var params = {
        phone: this.phone,
        code: this.code,
        captcha: this.captcha
      }
      console.log(params);
      let result = await phonelogin("/adminapi/phonelogin", params, "post");
      console.log(result);
    },
    async getphonecode () {//获取手机验证码
      console.log(this.yanzheng);
      if (this.yanzheng) {//为真时手机号符合规则
        this.num = 60
        this.text = "重新获取验证码"
        this.timer = setInterval(() => {
          this.num--
          if (this.num == 0) {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      } else {
        alert("手机号错误")
      }
      console.log(this.phone);
      let result = await getphonecode("/adminapi/getcode", this.phone, "post")
      console.log(result);
    },
    changeflag (index) {
      this.flag = index;

      for (var i = 0; i < this.$refs.tablogin.children.length; i++) {
        this.$refs.tablogin.children[i].style.background = "pink"
        this.$refs.tablogin.children[i].style.color = "#333"
      }
      this.$refs.tablogin.children[index].style.background = "red";
      this.$refs.tablogin.children[index].style.color = "#ccc"
    },
    changesrc () {//点击更换验证码
      var timer = new Date().getTime();
      alert("1561")
      this.$refs.img.src = "/adminapi/svgcaptcha?t" + timer
    }
  },
  beforeCreate () { }, //生命周期 - 创建之前
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  beforeMount () { }, //生命周期 - 挂载之前
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.flag = this.$route.query.id;

  },
  beforeUpdate () { }, //生命周期 - 更新之前
  updated () { }, //生命周期 - 更新之后
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less">
.loginbox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-self: center;
  align-content: flex-end;
  background-color: #fff;
  > .logincontent {
    margin: 0 1rem;
    width: calc(100% - 2rem);
    height: 50rem;
    margin-top: 10rem;
    .imgbox {
      width: 10rem;
      height: 10rem;
      border: 1rem solid #efefef;
      border-radius: 50%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .frombox {
      width: 100%;
      .tablogin {
        width: 100%;
        height: 4.4rem;
        text-align: center;
        span {
          float: left;
          width: 50%;
          text-align: center;
          line-height: 4.4rem;
          font-size: 2.4rem;
          text-align: center;
          color: #333;
          &:first-child {
            background: red;
            color: #ccc;
          }
          &:last-child {
            background: pink;
          }
        }
      }
      .form {
        width: 100%;
        > div {
          width: 100%;
          height: 4rem;
          margin: 1rem 0rem;
          display: flex;
          input {
            width: calc(70% - 0.2rem);
            height: calc(3.8rem);
            border: 0.1rem solid #ccc;
            float: left;
            flex: 1;
          }
          span {
            width: 30%;
            height: 4rem;
            font-size: 1.2rem;
            text-align: center;
            float: right;
            line-height: 4rem;
            background-color: #efefef;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      a {
        width: 100%;
        height: 5rem;
        text-align: center;
        line-height: 5rem;
        background-color: red;
        color: #fff;
        font-size: 3rem;
        display: block;
      }
      p {
        margin-top: 3rem;
        text-align: center;
        color: #666;
        text-decoration: underline;
        font-size: 1.6rem;
      }
    }
  }
}
</style>