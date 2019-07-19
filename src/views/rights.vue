<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="权限管理" nav2="权限列表"></mybread>
    <!-- table表格 -->
    <el-table :data="tableData" border style="width: 100%" class="my-table">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="230"></el-table-column>
      <el-table-column prop="path" label="路劲" width="230"></el-table-column>
      <el-table-column prop="level" label="层级" width="230"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allRightList } from '../api/http';
export default {
  name: "rights",
  //数据
  data() {
    return {
      //表格内容
      tableData: []
    };
  },
  //生命钩子
  created() {
    //获取权限列表
    allRightList().then(backData => {
      for(let i = 0; i < backData.data.data.length; i++){
        switch(backData.data.data[i].level){
        case '0':
          backData.data.data[i].level = '一级';
          break;
        case '1':
          backData.data.data[i].level = '二级';
          break;
        case '2':
          backData.data.data[i].level = '三级';
          break;
      }
      }
      console.log(backData.data.data);
      this.tableData = backData.data.data;
    })
  },
};
</script>

<style lang="less" scoped>
.my-table {
  margin: 5px 0;
}
</style>
