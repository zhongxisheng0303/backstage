<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="用户管理" nav2="用户列表"></mybread>
    <!-- 输入框 按钮 -->
    <el-row class="my-search">
      <!-- 输入框 -->
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="2">
        <el-button type="success" plain @click.prevent="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 添加用户表单 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- table表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="#" width="30">
        <template slot-scope="scope">
          <span>{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain class="my-btn"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
  </div>
</template>

<script>
//导入axios
import { users, adduser } from "../api/http";
export default {
  name: "users",
  //数据
  data() {
    return {
      //输入框内容
      input3: "",
      //表格内容
      tableData: [],
      //当前页
      pagenum: 1,
      //页容量
      pagesize: 10,
      //总页数
      pageTotal: 0,
      //显示表单
      dialogFormVisible: false,
      //表单的内容
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //输入框宽度
      formLabelWidth: "120px",
      //判断输入框内容
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (/^[a-zA-Z0-9]{6,18}$/.test(value) == false) {
                callback(new Error("用户名由6-18位字母和数字组成"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (/^[a-zA-Z0-9]{6,18}$/.test(value) == false) {
                callback(new Error("密码由6-18位字母和数字组成"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (/^[0-9]{7,11}$/.test(value) == false) {
                callback(new Error("请输入正确的电话或手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  //方法
  methods: {
    //分页方法
    handleSizeChange() {},
    handleCurrentChange() {},
    //确定添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //添加用户
          adduser(this.form).then(backData => {
            this.dialogFormVisible = false;
            //重新获取用户
            this.getusers();
          });
        } else {
          return false;
        }
      });
    },
    //取消添加
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    //获取用户
    getusers() {
      users(this.pagenum, this.pagesize).then(backData => {
        //用户信息
        this.tableData = backData.data.data.users;
        //总页数
        this.pageTotal = backData.data.data.total;
      });
    }
  },
  //生命钩子
  created() {
    //获取用户
    this.getusers();
  }
};
</script>

<style lang="less" scoped>
.my-search {
  margin: 5px 0;
}
.my-btn {
  margin-left: 10px;
}
</style>
