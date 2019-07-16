<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="权限管理" nav2="角色列表"></mybread>
    <!-- 按钮 -->
    <el-row class="my-search">
      <!-- 按钮 -->
      <el-col :span="2">
        <el-button plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- table表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "roles",
  //数据
  data() {
    return {
      //表格内容
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.my-search {
  margin: 5px 0;
}
</style>
