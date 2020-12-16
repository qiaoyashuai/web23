<!-- 创建模板 每一个组件template中必须有一个根元素包裹着其他内容-->
<template>
  <div class="home-header">
    <div class="input">
      <input
        type="text"
        placeholder="请输入商品名称"
      />
      <i class="iconfont icon-sousuo"></i>
    </div>
    <div class="icon">
      <i class="iconfont icon-dkw_xiaoxi"></i>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

</script>
<style lang="less" scoped>
.home-header {
  width: 100%;
  height: 4.4rem;
  display: flex;
  justify-content: center;
  align-content: center;
  // position: fixed;
  // top: 0;
  // left: 0;
  z-index: 99;
  // background-color: red; //透明色
  background-color: transparent;
  .input {
    width: 90%;
    position: relative;
    top: 0;
    left: 0;
    color: #ccc;
    input {
      border: 0;
      outline: 0;
      width: calc(100% - 1rem);
      height: 3rem;
      margin-left: 1rem;
      border-radius: 2rem;
      margin-top: 0.7rem;
      text-indent: 2rem;
      color: #999;
    }
    i {
      position: absolute;
      top: 0;
      right: 2rem;
      line-height: 4.4rem;
    }
  }
  .icon {
    width: 10%;
    text-align: center;
    height: 4.4rem;
    line-height: 4.4rem;
    color: #fff;
    i {
      font-size: 2rem;
    }
  }
}
</style>
