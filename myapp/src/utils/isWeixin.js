export function isweixin() {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1; //当是微信浏览器时为true 否则为false  返回一个布尔值
}