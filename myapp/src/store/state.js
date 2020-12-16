// import { catalogLeft, catalogRight } from '../api/api';
// console.log(catalogLeft);
// let catalogLeftdata = null;
// catalogLeft('/api/catalog/list').then(res => {
//     catalogLeftdata = res;
// });
// import { catalogRight } from '../api/api';
// let catalogLeftdata = catalogLeft('/api/catalog/list');
// let catalogRightdata = catalogRight('"/api/catalog/list/858"');

let state = {
    num: 10,
    catalogLeftdata: [], //分类左边数据
    catalogRightdata: [], //分类右边数据
    cataloglistsdata: [], //存放分类列表的商品数据
    detaillists: [], //详情页数据
    posterdatas: {}, //画布的数据
    // cartnum: 0, //购物车商品的数量
    //购物车中的数据使用本地存储 localStorage 存储数据
    cartDatas: localStorage['cart'] ? JSON.parse(localStorage['cart']) : [], //当本地存储有数据时使用该数据 否则为空数组
    quanxuannum: localStorage['quanxuannum'] ?
        JSON.parse(localStorage['quanxuannum']) :
        true,
    keywords: '',
    addkeywords: localStorage['addkeywords'] ?
        JSON.parse(localStorage['addkeywords']) :
        [],
    userInfo: localStorage['token'] ? JSON.parse(localStorage['token']) : {},
};
export default state;