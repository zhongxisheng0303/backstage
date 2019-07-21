<template>
  <div>
    <!-- 消息提醒 -->
    <el-alert title="添加商品信息" type="info" center show-icon class="my-addAlert"></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="parseInt(active - 1)" finish-status="success" align-center class="my-steps">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab标签页 -->
    <el-tabs v-model="active" tab-position="left">
      <el-tab-pane name="1" label="基本信息"></el-tab-pane>
      <el-tab-pane name="2" label="商品参数"></el-tab-pane>
      <el-tab-pane name="3" label="商品属性"></el-tab-pane>
      <el-tab-pane name="4" label="商品图片">
        <!-- 上传图片 -->
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="headers"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane name="5" label="商品内容"></el-tab-pane>
    </el-tabs>
    <!-- 大图预览图片 -->
    <transition name="slide-fade">
      <div class="my-shade" v-show="showImg" @click="hideImg">
        <img :src="imgUrl" width="1200" height="800" @click="hideImg" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "goodsadd",
  //数据
  data() {
    return {
      //步骤条和tab标签页
      active: "1",
      //设置token
      headers: { Authorization: window.sessionStorage.getItem("token") },
      showImg: false,
      imgUrl: ""
    };
  },
  //方法
  methods: {
    //上传图片的方法
    handleRemove(file) {},
    handlePreview(file) {
      this.showImg = true;
      this.imgUrl = file.url;
    },
    //隐藏预览图片
    hideImg() {
      this.showImg = false;
    }
  }
};
</script>

<style scoped lang="less">
.my-addAlert {
  margin-top: 10px;
}
.my-steps {
  margin: 20px 0 30px 0;
}
.my-shade {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.3);
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
