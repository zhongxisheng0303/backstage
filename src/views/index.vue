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
        <el-col :span="19">
          <div class="grid-content bg-purple-light">
            <h2>某哔哩后台管理系统</h2>
          </div>
        </el-col>
        <!-- 退出 -->
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a href="#" style="color:#000;">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 中心内容 -->
    <el-container class="my-content">
      <!-- 侧边导航条 -->
      <el-aside width="200px" class="my-aside">
        <!-- 侧边导航条 -->
        <el-menu default-active="2" class="el-menu-vertical-demo" :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>选项1
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-menu"></i>选项2
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>选项1
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>选项2
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 核心内容 -->
      <el-main class="my-main"></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
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
      height: 100%;
      background-color: #e9eef3;
    }
  }
}
</style>
