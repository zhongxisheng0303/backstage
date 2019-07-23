<template>
  <div class="my-box">
    <div class="box">
      <img src="../assets/img/timg.jpg" />
      <router-link to="/index">
        <span></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "error"
};
</script>

<style lang="less" scoped>
.my-box {
  width: 100%;
  height: 100%;
  background-color: #f1edee;
  position: fixed;
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    span {
      width: 80px;
      height: 20px;
      position: absolute;
      left: 320px;
      top: 232px;
    }
  }
}
</style>
