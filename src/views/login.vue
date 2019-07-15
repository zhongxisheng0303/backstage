<template>
  <div class="longin-box">
    <div class="login">
      <h2>用户登录</h2>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLogin" :rules="rules">
        <el-form-item label="用户账户" prop="username">
          <el-input type="text" v-model="formLogin.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLogin.password"></el-input>
        </el-form-item>
        <el-button type="primary" class="submit" @click.prevent="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  //数据
  data() {
    return {
      labelPosition: "top",
      formLogin: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户账户", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个数字和字母", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个数字和字母", trigger: "change" }
        ]
      }
    };
  },
  //方法
  methods: {
      //登录
      login(){
          
      }
  },
};
</script>

<style lang="less" scoped>
.longin-box {
  width: 100%;
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 580px;
    height: 435px;
    background-color: #fff;
    border-radius: 5px;
    padding: 36px 40px;
    box-sizing: border-box;
  }
  h2 {
    margin: 20px 0px;
  }
  .submit {
    width: 100%;
  }
}
</style>
