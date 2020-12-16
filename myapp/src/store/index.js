import Vue from 'vue';
import Vuex from 'vuex'; //需要下载  cnpm install vuex --save
Vue.use(Vuex);
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './gettings';
// 实例化一个store对象
let store = new Vuex.Store({
    state, //定义数据
    mutations, //改变state中数据的唯一途径
    actions, //想当与mutations的加强版 可以异步
    getters, //需要在vue事例中的计算属性中引用
});
export default store;