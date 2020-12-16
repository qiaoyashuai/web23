//连接数据库  下载数据库模块 cnpm install mysql --save
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost', //域名或者ip地址
    user: 'root', //用户
    password: '', //密码
    database: 'mysql', //数据库
});
// console.log(db); //可以打印出来
// select * from user_login  查询数据库语句
// let usesql = 'select * from user_login';
// console.log(usesql);
// db.query(usesql, (err, data) => {
//     if (!err) {
//         console.log(651515);
//         console.log(data); //可以打印出数据
//     } else {
//         console.log(err);
//     }
// });
//封装一个查询数据的方法 给定不同的sql语句给不不同的数据
function requestQuery(sql) {
    //连接好服务器 同时创建一个函数 来传入搜索语句来获取数据
    //参数为sql语句
    return new Promise((resolve, reject) => {
        console.log(db.query);
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}
// 暴露
module.exports = {
    requestQuery,
};