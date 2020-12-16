//所有通过ajax获取的数据都从这里引入
import ajax from './ajax';
export const catalogHeader = async(url, parmas) => {
    return await ajax(url, parmas);
};
export const catalogLeft = async(url, parmas, type) => {
    //左边数据
    return await ajax(url, parmas, type);
};
export const catalogRight = async aid => {
    //右边数据
    console.log('/api/catalog/list/' + aid);
    return await ajax('/api/catalog/list/' + aid); //创建接口
};
export const cataloglists = async(url, parmas, type) => {
    //产品数据
    return await ajax(url, parmas, type);
};
export const detaillists = async(url, parmas, type) => {
    //产品详情页数据
    return await ajax(url, parmas, type);
};
//获取手机验证码接口
export const getphonecode = async(url, parmas, type) => {
    return await ajax(url, parmas, type);
};
// 短信登录
export const phonelogin = async(url, parmas, type) => {
    return await ajax(url, parmas, type);
};