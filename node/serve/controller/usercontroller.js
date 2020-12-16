//这里写user里面的逻辑内容 比如连接数据库什么的
let { requestQuery } = require('../database/db'); //引入db模块 是一个函数
let moment = require('moment'); //cnom i moment --save 引入时间格式模块
let bcrypt = require('bcrypt'); //cnpm install bcrypt --save 加密
let salt = bcrypt.genSaltSync(10);
const { iHuyi } = require('./huaqian');
// console.log(salt);
// console.log(requestQuery);
let JWT = require('./token'); //这是一个对象
// JWT.createToken 这个才是一个函数
// 用户列表
exports.userList = async(req, res) => {
    //暴露一个对象 而内容就是属性以及属性值
    //暴露一个对象 {userList} 属性属性值一样写一个就行 而这个对象的属性值是一个异步箭头函数
    let usesql = 'select * from user_login';
    // select * from user_login where phone=15151 查询带条件的
    // select * from user_login where phone=15151 And user_id=2 查询带多个条件的
    let userList = await requestQuery(usesql);
    // console.log(userList);
    res.json(userList);
}; //将该异步函数来发送给router中来当做箭头函数
// 用户注册
exports.userregist = async(req, res) => {
    //要接受post提交的数据
    // console.log(req.body);//可以打印出内容
    // 注册需要判断用户是否存在 同时也要判断该手机号是否使用过
    let username = req.body.name;
    // console.log(username);
    let password = bcrypt.hashSync(req.body.password, salt); //第一个参数是要加密的内容 加密
    // console.log(password);
    let phone = req.body.phone;
    let usesql = `SELECT * FROM user_login Where user_name='${username}' AND is_show=1`; //先使用?来代替要查询的值  或者使用模板字符串
    let user = await requestQuery(usesql);
    // console.log(user); 得到数据库中的数据
    if (user == '') {
        //   当user不为空时该用户名已经存在不能注册 为空时还要检查手机号是否使用
        let phonesql = `SELECT * FROM user_login Where phone='${phone}'`;
        let user = await requestQuery(phonesql);
        if (user == '') {
            console.log('可以注册');
            // 此时需要给数据库添加注册
            // user_id user_name phone is_show create_time login_password 不可为空的数据项
            let create_time = moment().format('YYYY-MM-DD hh:mm:ss');
            // console.log(create_time); //获取到2020-12-07 08:02:11 格式的时间
            // 向数据库中插入数据
            let addsql = `insert into user_login(user_name,phone,is_show,create_time,login_password) values('${username}','${phone}',${1},'${create_time}','${password}')`;
            let user = await requestQuery(addsql); //添加成功 但是user不是数据库中的数据
            //console.log(user);// 打印结果
            // OkPacket {
            //   fieldCount: 0,
            //   affectedRows: 1,
            //   insertId: 3,
            //   serverStatus: 2,
            //   warningCount: 0,
            //   message: '',
            //   protocol41: true,
            //   changedRows: 0
            // }
            if ((user.affectedRows = 1)) {
                res.json({
                    msg: '恭喜你注册成功 可以去登录了',
                    status: 200,
                    result: user,
                });
            } else {
                res.json({
                    msg: '注册失败',
                    status: 1003,
                    result: err,
                });
            }
        } else {
            res.json({
                msg: '该手机号已经使用 请重新注册',
                statu: 500,
            });
        }
    } else {
        res.json({
            msg: '该用户名已经使用 请重新注册',
            statu: 501,
        });
    }
};
//用户登录
exports.userLogin = async(req, res) => {
    //使用post接受req.body中的数据
    console.log(req.body);
    let username = req.body.name;
    let password = req.body.password;
    let select = `SELECT * FROM user_login Where user_name='${username}' AND is_show=1`;
    console.log(select);
    let datas = await requestQuery(select); //查询到数据
    console.log(12312195189189);
    console.log(datas[0]);
    let login_password = bcrypt.compareSync(password, datas[0].login_password); //解密对比 是否相等 返回布尔值
    console.log('sefefesfe');
    // console.log(login_password);
    console.log('sefefesfe');
    if (datas[0].user_name == '') {
        return res.json({
            msg: '该用户不存在，快去注册一个吧',
            status: 1004,
        });
    } else if (!login_password) {
        //为false时有该用户但是密码错误
        return res.json({
            msg: '密码不正确',
            status: 1005,
        });
    } else {
        //为true时登录成功
        let token = JWT.createToken({
            username,
            login: true,
        });
        console.log(1561156165);
        console.log(token);
        console.log(1561156165);
        return res.json({
            status: 200,
            msg: '登录成功',
            data: datas,
            token: token,
        });
    }
};
// 设置全局变量
let tempcode = null; //手机验证码
let tempphone = null; //存储临时手机号
let tempcaptcha = null; //存储临时验证码
//获取验证码
exports.GetIdentifyingCode = async(req, res) => {
    // 步骤 1.输入正确的验证码
    // 2. 点击获取验证码 发送请求
    //3. 短信内容+随机验证码
    // console.log(req.body);
    let phone = 0;
    for (var attr in req.body) {
        console.log(attr);
        phone = attr; //前台输入的手机号
        tempphone = attr; // 给临时手机号变量赋值
    }
    //接下来就是随机生成一个六位的随机验证码
    let identCode = Math.floor(Math.random() * 999999) + ''; //随机生成一个六位的随机数
    tempcode = identCode; //给全局变量赋值
    // console.log(identCode);
    // res.json({
    //     msg: '发送成功',
    //     status: 200,
    //     data: identCode,
    // });
    console.log(phone);
    console.log(1156156156161);
    console.log(tempcode);
    console.log(1156156156161);
    let MessageContent =
        '您的验证码是：' + tempcode + '。请不要把验证码泄露给其他人。';
    iHuyi.send(phone, MessageContent, function(err, smsId) {
        //第一个参数是手机号 第二个是内容验证码
        if (err) {
            console.log(err.message);
        } else {
            res.json({
                msg: '验证码发送成功',
                status: 200,
            });
            // console.log('SMS sent, and smsId is ' + smsId);
        }
    });
};
// 短信登录
exports.phonelogin = async(req, res) => {
    console.log(req.body);
    console.log(req.body.phone); //前台的手机号
    console.log(req.body.code); //前台的验证码
    var phone = req.body.phone;
    var code = req.body.code;
    var captcha = req.body.captcha;
    console.log(tempcode);
    console.log(tempphone);
    console.log(tempcaptcha);
    if (code != tempcode) {
        //如果不相等则是验证码不相等
        return res.json({
            status: 1008,
            msg: '手机验证码不正确',
        });
    } else if (phone != tempphone) {
        //不过不相等则是手机号不相等
        return res.json({
            status: 1009,
            msg: '手机号不正确',
        });
    } else if (captcha != tempcaptcha) {
        //不过不相等则是手机号不相等
        return res.json({
            status: 1010,
            msg: '随机验证码不正确',
        });
    } else {
        //手机号正确切验证码正确
        // 手机号在数据库中存在时登录 手机号在数据库中不存在时则注册一个账户
        const sql = `select * from user_login where phone=${phone} AND is_show=1`;
        let ophone = await requestQuery(sql); //如果手机号存在是一个数组
        console.log(ophone);

        if (ophone.length == 0) {
            //该用户不存在则添加用户 注册一个用户 需要随机生成一个用户名
            let stringRandom = require('string-random');
            let username = stringRandom(12);
            console.log(username); //生成成功
            // let password = 123456;
            let password = bcrypt.hashSync(10, salt); //第一个参数是要加密的内容 加密
            console.log(password);
            let create_time = moment().format('YYYY-MM-DD hh:mm:ss'); //当前时间
            let addsql = `insert into user_login(user_name,phone,is_show,create_time,login_password) values('${username}','${phone}',${1},'${create_time}','${password}')`;
            let user = await requestQuery(addsql); //向数据库中添加数据
            if ((user.affectedRows = 1)) {
                //为true时登录成功
                let token = JWT.createToken({
                    username,
                    login: true,
                });
                //添加成功
                res.json({
                    msg: '恭喜你注册成功 可以去登录了',
                    status: 200,
                    result: user,
                    token,
                });
            }
        } else {
            let username = ophone[0].user_name;
            //手机号存在时直接登录
            let token = JWT.createToken({
                username,
                login: true,
            });
            res.json({
                msg: '登录成功',
                status: 200,
                token,
            });
        }
    }
};
//生成随机验证码模块
var svgCaptcha = require('svg-captcha'); //引入生成验证码模块
exports.svgCaptcha = async(req, res) => {
    let captcha = svgCaptcha.create({
        size: 4, // 字母长度
        ignoreChars: '0o1i', //去除字符
        noise: 1, // 横线数量
        color: true, //字体颜色
        background: '#cc9966', // 背景颜色
    });
    res.type('svg');
    res.status(200).send(captcha.data);
    tempcaptcha = captcha.text;
    console.log(651651561);
    console.log(tempcaptcha); //可以获取
    console.log(651651561);
};