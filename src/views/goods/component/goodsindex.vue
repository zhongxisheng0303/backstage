<template>
  <div>
    <!-- 输入框 按钮 -->
    <el-row class="my-search">
      <!-- 输入框 -->
      <el-col :span="5">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          @keyup.enter.native="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="2">
        <el-button type="success" plain @click="add">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- table表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{ scope.row.upd_time | formatTime('YYYY-MM-DD HH:mm:ss') }}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- 修改商品 -->
          <el-button type="primary" icon="el-icon-edit" size="mini" plain class="my-btn"></el-button>
          <!-- 删除商品 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
  </div>
</template>

<script>
//导入axios
import { getCommodityList } from "../../../api/http";
export default {
  name: "goodsindex",
  //数据
  data() {
    return {
      //输入框内容
      query: "",
      //表格内容
      tableData: [],
      //当前页
      pageNum: 1,
      //页容量
      pageSize: 10,
      //总共条数
      pageTotal: 0
    };
  },
  //生命钩子
  created() {
    //获取商品列表
    this.getCommodity();
  },
  //方法
  methods: {
    //分页方法
    handleSizeChange(size) {
      //改变页容量
      this.pageSize = size;
      //重新获取商品列表
      this.getCommodity();
    },
    handleCurrentChange(current) {
      //改变当前页
      this.pageNum = current;
      //重新获取商品数据
      this.getCommodity();
    },
    //获取商品数据列表
    getCommodity() {
      const list = {
        query: this.query,
        pagenum: this.pageNum,
        pagesize: this.pageSize
      };
      //获取商品数据
      getCommodityList(list).then(backData => {
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data.goods;
          this.pageTotal = backData.data.data.total;
        }
      });
    },
    //搜索关键字
    search() {
      //获取商品数据列表
      this.getCommodity();
    },
    add() {
      this.$router.push("/index/goods/goodsadd");
    }
  }
};
</script>

<style scoped lang="less">
.my-search {
  margin: 5px 0;
}
.my_btn {
  margin-left: 10px;
}
</style>
