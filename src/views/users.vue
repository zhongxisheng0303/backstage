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
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="close('form')">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="state(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- 修改用户 -->
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            class="my-btn"
            @click="getIdUsers(scope.row.id)"
          ></el-button>
          <!-- 删除用户 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <!-- 分配角色 -->
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="alterForm" @close="close('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-input type="hidden" v-model="form.id" autocomplete="off" :disabled="true"></el-input>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterForm = false">取 消</el-button>
        <el-button type="primary" @click="amend">确 定</el-button>
      </div>
    </el-dialog>
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
import { users, adduser, userstate, getuser, amenduser } from "../api/http";
import loginVue from "./login.vue";
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
      //显示添加表单
      dialogFormVisible: false,
      //显示修改表单
      alterForm: false,
      //表单的内容
      form: {
        id: "",
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
              if (/^\d{7,11}$/.test(value) == false) {
                callback(new Error("请输入正确的电话或手机号"));
              } else {
                callback();
              }
            },
            trigger: "change"
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
    //确定添加用户
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
    //获取用户
    getusers() {
      users(this.pagenum, this.pagesize).then(backData => {
        //用户信息
        this.tableData = backData.data.data.users;
        //总页数
        this.pageTotal = backData.data.data.total;
      });
    },
    //用户状态
    state(uId, type) {
      //请求改变用户状态
      userstate(uId, type).then(backData => {
        if (backData.data.meta.status == 200) {
          this.$message.success("设置状态成功!");
        } else {
          this.$message.error("设置状态失败!");
        }
      });
    },
    //根据id获取用户
    getIdUsers(id) {
      this.alterForm = true;
      //根据id获取用户
      getuser(id).then(backData => {
        this.form.id = backData.data.data.id;
        this.form.username = backData.data.data.username;
        this.form.email = backData.data.data.email;
        this.form.mobile = backData.data.data.mobile;
      });
    },
    //弹框关闭
    close(formName) {
      //输入框清空
      this.$refs[formName].resetFields();
      this.form.username = "";
    },
    //修改用户
    amend() {
      //声明一个对象
      const alterRear = {
        id: this.form.id,
        email: this.form.email,
        mobile: this.form.mobile
      };
      //请求修改用户
      amenduser(alterRear).then(backData => {
        if(backData.data.meta.status == 200){
          this.$message.success('修改成功!');
          this.alterForm = false;
          //重新获取用户
          this.getusers();
        }else{
          this.$message.error('修改失败!')
        }
      })
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
