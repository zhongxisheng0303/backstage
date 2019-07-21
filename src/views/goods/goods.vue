<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="商品管理" nav2="商品列表"></mybread>
    <!-- 出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "goods",
 
};
</script>

<style>

</style>
