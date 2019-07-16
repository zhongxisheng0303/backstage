<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ nav1 }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ nav2 }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "mybread",
  props:['nav1','nav2'],
  //数据
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.my-bread {
  height: 40px;
  line-height: 40px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>
