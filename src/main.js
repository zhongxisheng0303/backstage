import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入全局样式
import './assets/css/reset.css';

//导入组件
import mybread from './components/mybread.vue';
//注册组件
Vue.component('mybread',mybread);

//导入moment
import moment from 'moment';
//全局过滤
Vue.filter('formatTime',(value,time) => {
  return moment(value).format(time)
})

//导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入路由
import router from './router/router';

new Vue({
  render: h => h(App),
  //将路由挂载到vue实例
  router,
}).$mount('#app');

