// 此页面创建token
// cnpm install jsonwebtoken --save  下载token
let jwt = require('jsonwebtoken');
// 生成一个token;
let str = 'sddfse'; //随便写的
// let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
// 写一个创建token的方法
function createToken(obj) {
    //参数为默认就有的
    obj.time = Date.now(); //添加时间戳
    console.log(obj);
    console.log(jwt.sign(obj, str, { expiresIn: 60 * 60 }));
    return jwt.sign(obj, str, { expiresIn: 60 * 60 }); //第三个参数过期时间 expiresIn 有效期的意思单位为s
}
// 验证token
function yanzhengtoken(token) {
    //verify  验证的意思
    return new Promise((resolve, reject) => {
        jwt.verify(token, str, (err, data) => {
            if (err) {
                reject('token失效');
            }
            resolve(data);
        });
    });
}
module.exports = {
    createToken,
    yanzhengtoken,
};