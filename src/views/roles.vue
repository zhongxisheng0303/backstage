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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改角色 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="showRole(scope.row)"
          ></el-button>
          <!-- 删除角色 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="deleteRole(scope.row)"
          ></el-button>
          <!-- 权限分配 -->
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
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
    <!-- 编辑角色弹框 -->
    <el-dialog title="编辑角色" :visible.sync="editRoleHide" @close="close">
      <el-form :model="editrole" :rules="rules" ref="editrole">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="editrole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="roleDesc">
          <el-input v-model="editrole.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleHide = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, appendRole, sureEditRole, deleterole } from "../api/http";
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
      },
      //编辑角色弹框隐藏
      editRoleHide: false,
      //编辑角色数据
      editrole: {
        roleName: "",
        roleDesc: "",
        id: ""
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
              this.$message.error("添加角色失败!");
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
      if (role == undefined) {
        //重新获取角色
        this.getRole();
      } else {
        //还原输入框
        this.$refs[role].resetFields();
      }
    },
    //编辑角色弹框
    showRole(row) {
      this.editrole = row;
      //显示弹框
      this.editRoleHide = true;
    },
    //确定编辑角色
    sureEdit() {
      const role = {
        id: this.editrole.id,
        roleName: this.editrole.roleName,
        roleDesc: this.editrole.roleDesc
      };
      //请求编辑角色
      sureEditRole(role).then(backData => {
        if (backData.data.meta.status == 200) {
          this.$message.success("编辑角色成功!");
          //隐藏弹框
          this.editRoleHide = false;
        } else {
          this.$message.error("编辑角色失败!");
        }
      });
    },
    //删除角色
    deleteRole(row) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //请求删除角色
          deleterole({id:row.id}).then(backData => {
            if(backData.data.meta.status == 200){
              this.$message.success('删除成功!')
              //重新获取角色
              this.getRole();
            }else{
              this.$message.error('删除失败!')
            }
          })
        })
        .catch(() => {
          this.$message('已取消删除!')
        });
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
