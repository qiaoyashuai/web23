import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
import home from '../views/home/home.vue';
import catalog from '../views/catalog/catalog.vue';
import find from '../views/find/find.vue';
import cart from '../views/cart/cart.vue';
import mine from '../views/mine/mine.vue';
import categorylist from '../views/catalog/children/categorylist.vue';
import Detail from '../views/Detail/Detail.vue';
import search from '../views/catalog/children/search.vue';
// console.log(Detail);
let routes = [{
        path: '/home',
        component: home,
        children: [{
                path: '/home', //重定向
                redirect: 'index',
            },
            {
                path: 'index', //首页
                component: () =>
                    import ('../views/home/children/index/index.vue'), //首页
            },
            {
                path: 'shoebag', //鞋靴箱包
                component: () =>
                    import ('../views/home/children/shoebag/shoebag .vue'),
            },
            {
                path: 'household', //家用电器
                component: () =>
                    import ('../views/home/children/household/household.vue'),
            },
            {
                path: 'clothing', //男装女装
                component: () =>
                    import ('../views/home/children/clothing/clothing.vue'),
            },
            {
                path: 'mobilephones', //手机数码
                component: () =>
                    import ('../views/home/children/mobilephones/mobilephones .vue'),
            },
            {
                path: 'computer', //电脑办公
                component: () =>
                    import ('../views/home/children/computer/computer.vue'),
            },
            {
                path: 'hometextiles', //家居家纺
                component: () =>
                    import ('../views/home/children/hometextiles/hometextiles.vue'),
            },
            {
                path: 'personalmakeup', //个人美妆
                component: () =>
                    import ('../views/home/children/personalmakeup/personalmakeup .vue'),
            },
        ],
    },
    {
        path: '/catalog',
        component: catalog,
    },
    {
        path: '/find',
        component: find,
    },
    {
        path: '/cart',
        component: cart,
    },
    {
        path: '/mine',
        component: mine,
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/categorylist/:cid',
        component: categorylist,
    },
    {
        path: '/detail/:goods_id',
        component: Detail,
    },
    {
        path: '/search', //搜索页面
        component: search,
    },
    {
        path: '/searchlist', //搜索页面
        component: () =>
            import ('../views/catalog/children/searchlists.vue'),
    },
    {
        path: '/login', //登录界面
        component: () =>
            import ('../views/mine/child/login.vue'),
    },
];
let router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.path == '/mine' || to.path == '/login') {
        next();
        return;
    }
    let token = JSON.parse(window.localStorage.getItem('token'));
    console.log(token);
    if (!token) {
        return next('/login');
    } else {
        next();
    }
});

export default router;