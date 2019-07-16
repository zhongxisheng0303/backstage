<template>
  <el-container class="my-index">
    <!-- 头部 -->
    <el-header class="my-header">
      <el-row>
        <!-- logo -->
        <el-col :span="4" style="height:60px;">
          <div class="grid-content bg-purple">
            <img src="../assets/img/logo.png" alt height="60" />
          </div>
        </el-col>
        <!-- 标题 -->
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <h2>某哔哩后台管理系统</h2>
          </div>
        </el-col>
        <!-- 退出 -->
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#" style="color:#000;" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 中心内容 -->
    <el-container class="my-content">
      <!-- 侧边导航条 -->
      <el-aside width="200px" class="my-aside">
        <!-- 侧边导航条 -->
        <el-menu default-active="2" class="el-menu-vertical-demo" :unique-opened="true" :router="true">
          <el-submenu v-for="(item,index) in menusList" :index="(index + 1).toString()">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(items,index) in menusList[index].children"
                :index="'index/'+items.path"
              >
                <i class="el-icon-menu"></i>
                {{ items.authName }}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 核心内容 -->
      <el-main class="my-main">
        <!-- 内容出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入菜单权限
import { menus } from "../api/http";
export default {
  name: "index",
  //数据
  data() {
    return {
      //菜单权限
      menusList: []
    };
  },
  //方法
  methods: {
    //登出
    logout() {
      this.$confirm("确定退出当前账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除token
          window.sessionStorage.removeItem("token");
          //跳转到登录页
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出!"
          });
        });
    }
  },
  //生命钩子
  created() {
    //请求菜单权限
    menus().then(backData => {
      this.menusList = backData.data.data;
    });
  }
};
</script>

<style lang='less' scoped>
//整个主页
.my-index {
  height: 100%;
  //头部
  .my-header {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #b3c0d1;
  }
  //中心内容
  .my-content {
    height: 100%;
    //侧边导航
    .my-aside {
      height: 100%;
      background-color: #fff;
    }
    //核心内容
    .my-main {
      padding: 0px 20px;
      height: 100%;
      background-color: #e9eef3;
    }
  }
}
</style>
