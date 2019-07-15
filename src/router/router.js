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
        //路由原信息
        meta: { requiresAuth: false }
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

//导航守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth != false) {
        if (window.sessionStorage.getItem('token') == undefined) {
            //警告
            new Vue().$message.error('请先登录账号!');
            //跳转到登录页
            router.push('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

//暴露路由
export default router;