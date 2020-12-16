let express = require('express');
let app = new express();
// 引入自定义模块
//后台允许前端跨域请求数据开始
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
const usersrouter = require('./router/users');
app.use(
    // 高版本的express 不需要使用body-parser模块
    // 需要配置
    express.urlencoded({
        extended: false,
    })
); //配置接受post发送过来的数据
app.use(express.json());

app.use('/adminapi', usersrouter); //使用路由 router里面的路径都是adminapi下面的
app.listen(3030, () => {
    console.log('3030running');
});