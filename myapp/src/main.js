import Vue from 'vue';
import App from './App.vue';
import LyTab from 'ly-tab';
import mintui from 'mint-ui';
//引入mint UI 样式
import 'mint-ui/lib/style.css';
import store from './store/index';
// 注册
Vue.use(LyTab);
Vue.use(mintui);
Vue.config.productionTip = false;
// import createrouter from "./router/router"
import router from './router/router';
// let router = createrouter()
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');