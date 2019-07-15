//导入Vue
import Vue from 'vue';

//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//导入页面组件
import login from '../views/login.vue';
import index from '../views/index.vue';

//路由规则
const routes = [
    //重定向
    {
        path: '/',
        redirect: 'login'
    },
    //登录页
    {
        path: '/login',
        component: login,
    },
    //后台首页
    {
        path: '/index',
        component: index,
    }
];

//实例路由
const router = new VueRouter({
    routes,
});

//暴露路由
export default router;