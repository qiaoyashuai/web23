<template>
  <div
    id="app"
    v-cloak
  >
    <router-view></router-view>
    <!-- <vuexdemo /> -->
  </div>
</template>

<script>
// import vuexdemo from "./views/vuexdemo/vuedemo";//此模块是为了验证vuex的用法 管用
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import "./styles/commont.css";
@import "./fonts/iconfont.css";
.router-link-active {
  color: red;
}
[v-cloak] {
  display: none;
}
</style>
