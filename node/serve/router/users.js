let express = require('express');
let router = express.Router(); //创建路由对象
// 引入控制器模块的数据
let user = require('../controller/usercontroller');
router.get('/userlist', user.userList); //userlist.userList 是一个异步的箭头函数 直接写后面就行
router.post('/rejist', user.userregist); //用户注册
router.post('/login', user.userLogin); //用户登录
router.post('/getcode', user.GetIdentifyingCode); //获取验证码的接口
router.post('/phonelogin', user.phonelogin); //短信验证接口
router.get('/svgcaptcha', user.svgCaptcha); //生成验证码接口
module.exports = router;