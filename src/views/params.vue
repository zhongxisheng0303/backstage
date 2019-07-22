<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="商品管理" nav2="分类参数"></mybread>
    <!-- 提示 -->
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon class="my-title"></el-alert>
    <!-- 级连选择器 -->
    <el-row class="my-cascade">
      <el-col :span="24">
        <span style="margin-right:5px;">请选择商品分类：</span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
          placeholder="请选择商品分类"
        ></el-cascader>
      </el-col>
    </el-row>
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <!-- 按钮 -->
        <el-button type="primary" disabled class="my-size" size="small">添加动态参数</el-button>
        <!-- table表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-tag
                :key="tag"
                v-for="tag in props.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,props.row)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(props.row)"
                @blur="handleInputConfirm(props.row)"
              ></el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(props.row)"
              >+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="attr_name" label="商品参数" width="200"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">
        <!-- 按钮 -->
        <el-button type="primary" disabled class="my-size" size="small">添加静态参数</el-button>
        <!-- table表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="date" label="属性名称" width="180"></el-table-column>
          <el-table-column prop="name" label="属性值"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getDataList, getClassify } from "../api/http";
export default {
  name: "params",
  //数据
  data() {
    return {
      //表格内容
      tableData: [],
      inputVisible: false,
      inputValue: "",
      //选择框内容
      value: [],
      //级联选择器
      options: [],
      //标签页
      activeName: "first"
    };
  },
  //方法
  methods: {
    //级联选择器方法
    handleChange(value) {
      const id = value[value.length - 1];
      //获取分类参数列表
      this.getClassifyList(id, "many");
    },
    //获取分类参数列表
    getClassifyList(id, state) {
      getClassify({ id, sel: state }).then(backData => {
        //循环数据
        for (let i = 0; i < backData.data.data.length; i++) {
          //将attr_vals数据分隔成数组
          backData.data.data[i].attr_vals = backData.data.data[
            i
          ].attr_vals.split(",");
        }
        this.tableData = backData.data.data;
      });
    },
    //标签页方法
    handleClick() {},
    //删除属性
    handleClose(tag, row) {
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1);
    },
    //显示输入框
    showInput(row) {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //添加属性
    handleInputConfirm(row) {
      let inputValue = this.inputValue;
      if (inputValue) {
        row.attr_vals.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  //生命钩子
  created() {
    //获取商品数据列表
    getDataList().then(backData => {
      if (backData.data.meta.status == 200) {
        //递归方法
        function setData(item) {
          for (let i = 0; i < item.length; i++) {
            if (item[i].children) {
              //提黄
              item[i].value = item[i].cat_id;
              item[i].label = item[i].cat_name;
              //删除
              delete item[i].cat_id;
              delete item[i].cat_name;
              //重新调用函数
              setData(item[i].children);
            } else {
              //替换
              item[i].value = item[i].cat_id;
              item[i].label = item[i].cat_name;
              //删除
              delete item[i].cat_id;
              delete item[i].cat_name;
            }
          }
        }
        //调用函数
        setData(backData.data.data);
        this.options = backData.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.my-title {
  margin: 20px 0px;
}
.my-cascade {
  margin-bottom: 20px;
}
.my-size {
  margin-bottom: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
