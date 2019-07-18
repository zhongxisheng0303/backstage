<template>
  <div>
    <!-- 面包屑 -->
    <mybread nav1="权限管理" nav2="角色列表"></mybread>
    <!-- 按钮 -->
    <el-row class="my-search">
      <!-- 按钮 -->
      <el-col :span="2">
        <el-button plain @click="addRoleHide=true">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- table表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label width="35">
        <template slot-scope="scope">
          <i class="el-icon-arrow-right"></i>
        </template>
      </el-table-column>
      <el-table-column type="index" width="35"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <!-- 添加角色弹框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleHide" @close="close('addrole')">
      <el-form :model="addrole" :rules="rules" ref="addrole">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="addrole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input v-model="addrole.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleHide = false">取 消</el-button>
        <el-button type="primary" @click="sureRole('addrole')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, appendRole } from "../api/http";
export default {
  name: "roles",
  //数据
  data() {
    return {
      //表格内容
      tableData: [],
      //添加角色数据
      addrole: {
        roleName: "",
        roleDesc: ""
      },
      //添加角色隐藏框
      addRoleHide: false,
      //输入框规则
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },
  //方法
  methods: {
    //获取角色
    getRole() {
      roleList().then(backData => {
        this.tableData = backData.data.data;
      });
    },
    //确定添加角色
    sureRole(role) {
      this.$refs[role].validate(valid => {
        if (valid) {
          //请求添加角色
          appendRole(this.addrole).then(backData => {
            if (backData.data.meta.status == 201) {
              this.$message.success("添加角色成功!");
              //重新获取角色
              this.getRole();
              //隐藏弹框
              this.addRoleHide = false;
            } else {
              this.$message.error('添加角色失败!');
              //隐藏弹框
              this.addRoleHide = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //弹框关闭方法
    close(role) {
      //还原输入框
      this.$refs[role].resetFields();
    }
  },
  //生命钩子
  created() {
    //获取角色
    this.getRole();
  }
};
</script>

<style lang="less" scoped>
.my-search {
  margin: 5px 0;
}
</style>
