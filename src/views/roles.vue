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
      <el-table-column label="" width="35">
        <template slot-scope="scope">
          <i class="el-icon-arrow-right"></i>
        </template>
      </el-table-column>
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleList } from '../api/http';
export default {
  name: "roles",
  //数据
  data() {
    return {
      //表格内容
      tableData: []
    };
  },
  //生命钩子
  created() {
    //获取角色
    roleList().then(backData => {
      this.tableData = backData.data.data;
    })
  },
};
</script>

<style lang="less" scoped>
.my-search {
  margin: 5px 0;
}
</style>
