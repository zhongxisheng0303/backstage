<template>
  <!-- 大盒子 -->
  <div class="longin-box">
    <!-- 登录盒子 -->
    <div class="login">
      <h2>用户登录</h2>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLogin"
        :rules="rules"
        ref="formLogin"
      >
        <el-form-item label="用户账户" prop="username">
          <el-input type="text" v-model="formLogin.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLogin.password"></el-input>
        </el-form-item>
        <el-button type="primary" class="submit" @click="submit('formLogin')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
//导入接口
import { login } from "../api/http";
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
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个数字和字母",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个数字和字母",
            trigger: "blur"
          }
        ]
      },
      devData:{
        name: '呵呵'
      }
    };
  },
  //方法
  methods: {
    //登录
    submit(formName) {
      this.$refs[formName].validate(valid => {
        //输入框是否为空
        if (valid) {
          //登录请求
          login(this.formLogin).then(backData => {
            if (backData.data.meta.status == 200) {
              //登录成功
              this.$message.success(backData.data.meta.msg);
              //存储token
              window.sessionStorage.setItem("token", backData.data.data.token);
              //跳转到后台主页
              this.$router.push("/index");
            } else {
              //登录失败
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          //为空什么都不做
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
//大盒子
.longin-box {
  width: 100%;
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  //登录盒子
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
