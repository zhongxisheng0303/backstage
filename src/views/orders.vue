<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="订单管理" nav2="订单列表"></mybread>
    <!-- table表格 -->
    <el-table :data="tableData" border style="width: 100%;margin-top:5px;">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="300"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="80"></el-table-column>
      <el-table-column label="是否付款" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_send | formatColor">{{ scope.row.is_send | formatPayment }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" width="180">
        <template slot-scope="scope">{{ scope.row.is_send }}</template>
      </el-table-column>
      <el-table-column label="下单时间">
        <template slot-scope="scope">{{ scope.row.create_time | formatTime('YYYY-MM-DD HH:mm:ss') }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- 修改订单 -->
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            class="my-btn"
            @click="alterOrder(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 12, 15, 18]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagetotal"
    ></el-pagination>
    <!-- 修改订单弹框 -->
    <el-dialog title="修改订单收货地址" :visible.sync="alterOrderHide" @close="close">
      <el-form :model="form">
        <el-form-item label="省市区/县" label-width="120px">
          <el-cascader
            v-model="form.value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详情地址" label-width="120px">
          <el-input v-model="form.detailsOrder" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterOrderHide = false">取 消</el-button>
        <el-button type="primary" @click="alterOrderHide = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入axios
import { getorderList } from "../api/http";
//导入城市数据
import options from '../assets/js/city_data_2017';
//导入vue
import Vue from "vue";
export default {
  name: "orders",
  //数据
  data() {
    return {
      //表格内容
      tableData: [],
      //搜索内容
      query: "",
      //当前页
      pagenum: 1,
      //页容量
      pagesize: 10,
      //总页数
      pagetotal: 0,
      //修改弹框
      alterOrderHide: false,
      //修改地址详情地址
      form: {
        //详情地址
        detailsOrder: "",
        value: []
      },
      //级联城市数据
      options,
    };
  },
  //方法
  methods: {
    //分页方法
    handleSizeChange(size) {
      this.pagesize = size;
      //重新获取订单数据
      this.getorders();
    },
    handleCurrentChange(current) {
      this.pagenum = current;
      //重新获取订单数据
      this.getorders();
    },
    //获取订单列表
    getorders() {
      //请求订单列表
      getorderList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(backData => {
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data.goods;
          //总页数
          this.pagetotal = backData.data.data.total;
        }
      });
    },
    //显示修改订单弹框
    alterOrder(row) {
      //显示弹框
      this.alterOrderHide = true;
    },
    //弹框关闭方法
    close(){
      this.form.detailsOrder = '';
      this.form.value = [];
    }
  },
  //生命钩子
  created() {
    //获取订单列表
    this.getorders();
  },
  //过滤器
  filters: {
    //过滤是否有付款
    formatPayment(payment) {
      switch (payment) {
        case "是":
          return "已付款";
          break;
        case "否":
          return "未付款";
          break;
      }
    },
    formatColor(whether) {
      switch (whether) {
        case "是":
          return "success";
          break;
        case "否":
          return "danger";
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-btn {
  margin-left: 10px;
}
</style>
