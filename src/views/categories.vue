<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="商品管理" nav2="商品分类"></mybread>
    <!-- 按钮 -->
    <el-row class="my-search">
      <!-- 按钮 -->
      <el-col :span="2">
        <el-button type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <!-- table表格 -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="cat_id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="cat_name" label="分类" sortable width="180"></el-table-column>
      <el-table-column label="级别" sortable width="180">
        <template slot-scope="scope">{{ scope.row.cat_level | formatLevel }}</template>
      </el-table-column>
      <el-table-column label="是否有效" sortable width="180">
        <template slot-scope="scope">{{ scope.row.cat_deleted | formatDeleted }}</template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 8, 12, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
  </div>
</template>

<script>
//导入axios
import { getPageList } from "../api/http";
export default {
  name: "categories",
  //数据
  data() {
    return {
      //表格内容
      tableData: [],
      //当前页
      pagenum: 1,
      //页容量
      pagesize: 5,
      //总条数
      pageTotal: 0
    };
  },
  //方法
  methods: {
    //分页方法
    handleSizeChange(size) {
      this.pagesize = size;
      //重新获取商品数据
      this.getData();
    },
    handleCurrentChange(current) {
      this.pagenum = current;
      //重新获取商品数据
      this.getData();
    },
    //获取商品数据
    getData() {
      getPageList({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
        backData => {
          if (backData.data.meta.status == 200) {
            this.tableData = backData.data.data.result;
            //总条数
            this.pageTotal = backData.data.data.total;
          }
        }
      );
    }
  },
  //生命钩子
  created() {
    //获取商品数据
    this.getData();
  },
  //过滤器
  filters: {
    //过滤等级
    formatLevel(level) {
      switch (level) {
        case 0:
          return "一级";
          break;
        case 1:
          return "二级";
          break;
        case 2:
          return "三级";
          break;
      }
    },
    //过滤是否有效
    formatDeleted(deleted){
      if(deleted){
        return "无效"
      }else{
        return "有效"
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-search {
  margin: 5px 0;
}
</style>
