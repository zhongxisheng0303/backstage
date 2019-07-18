<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="用户管理" nav2="用户列表"></mybread>
    <!-- 输入框 按钮 -->
    <el-row class="my-search">
      <!-- 输入框 -->
      <el-col :span="5">
        <el-input placeholder="请输入内容" v-model="query" @keyup.enter.native="getusers" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="getusers"></el-button>
        </el-input>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="2">
        <el-button type="success" plain @click.prevent="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 添加用户表单弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close="close('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
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
            @click="getIdUsers(scope.row)"
          ></el-button>
          <!-- 删除用户 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="deleteuser(scope.row.id)"
          ></el-button>
          <!-- 分配角色 -->
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
            @click="allotrole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改用户弹框 -->
    <el-dialog title="修改用户" :visible.sync="alterForm" @close="close('editform')">
      <el-form :model="editform" :rules="rules" ref="editform">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="editform.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterForm = false">取 消</el-button>
        <el-button type="primary" @click="amend">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="allotRole">
      <el-form>
        <el-form-item label="当前用户" label-width="120px"></el-form-item>
        <el-form-item label="请选择角色" label-width="120px">
          <el-select v-model="value" placeholder="请选择角色">
            <el-option v-for="item in roles" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allotRole = false">取 消</el-button>
        <el-button type="primary" @click="allot">确 定</el-button>
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
import {
  users,
  adduser,
  userstate,
  getuser,
  amenduser,
  removeuser,
  roleList
} from "../api/http";
import loginVue from "./login.vue";
export default {
  name: "users",
  //数据
  data() {
    return {
      //表格内容
      tableData: [],
      //输入框内容
      query: '',
      //当前页
      pagenum: 1,
      //页容量
      pagesize: 10,
      //总页数
      pageTotal: 0,
      //显示添加表单
      dialogFormVisible: false,
      //表单的内容
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
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
      },
      //显示修改表单
      alterForm: false,
      //修改用户数据
      editform:{
        username: '',
        email: '',
        mobile: '',
        id: '',
      },
      //显示分配角色
      allotRole: false,
      //角色内容
      roles: [],
      //下拉框数据
      value: "",
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
            if (backData.data.meta.status == 201) {
              //隐藏添加用户弹框
              this.dialogFormVisible = false;
              this.$message.success("添加用户成功!");
              //重新获取用户
              this.getusers();
            }
          });
        } else {
          return false;
        }
      });
    },
    //获取用户
    getusers() {
      users(this.query,this.pagenum, this.pagesize).then(backData => {
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
    //修改用户弹框
    getIdUsers(row) {
      //将每一项数据给弹框
      this.editform = row;
      //显示用户弹框
      this.alterForm = true;
    },
    //弹框关闭
    close(formName) {
      //输入框还原
      this.$refs[formName].resetFields();
   
    },
    //修改用户
    amend() {
      //声明一个对象
      const alterRear = {
        id: this.editform.id,
        email: this.editform.email,
        mobile: this.editform.mobile
      };
      //请求修改用户
      amenduser(alterRear).then(backData => {
        if (backData.data.meta.status == 200) {
          this.$message.success("修改成功!");
          //隐藏修改用户弹框
          this.alterForm = false;
        } else {
          this.$message.error("修改失败!");
        }
      });
    },
    //删除用户
    deleteuser(id) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //请求删除用户
          removeuser(id).then(backData => {
            if (backData.data.meta.status == 200) {
              //重新获取用户信息
              this.getusers();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message.error("删除失败!");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!"
          });
        });
    },
    //角色分配弹框
    allotrole(row) {
      //请求获取角色
      roleList().then(backData => {
        this.roles = backData.data.data;
      });
      //显示分配框
      this.allotRole = true;
    },
    //分配角色
    allot(row) {}
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
