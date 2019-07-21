//导入Vue
import Vue from 'vue';

//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//导入页面组件
import login from '../views/login.vue';
import index from '../views/index.vue';

//导入嵌套路由
import users from '../views/users.vue';
import roles from '../views/roles.vue';
import rights from '../views/rights.vue';
import goods from '../views/goods/goods.vue';
import params from '../views/params.vue';
import categories from '../views/categories.vue';
import orders from '../views/orders.vue';
import reports from '../views/reports.vue';

//导入商品管理嵌套路由
import goodsindex from '../views/goods/component/goodsindex.vue';
import goodsadd from '../views/goods/component/goodsadd.vue';

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
        meta: { requiresAuth: true },
    },
    //后台首页
    {
        path: '/index',
        component: index,
        //嵌套路由
        children: [
            //用户列表
            {
                path: 'users',
                component: users,
            },
            //角色列表
            {
                path: 'roles',
                component: roles,
            },
            //权限列表
            {
                path: 'rights',
                component: rights,
            },
            //商品列表
            {
                path: 'goods',
                component: goods,
                //嵌套路由
                children: [
                    {
                        path: '',
                        component: goodsindex,
                    },
                    {
                        path: 'goodsadd',
                        component: goodsadd,
                    }
                ]
            },
            //分类参数
            {
                path: 'params',
                component: params,
            },
            //商品分类
            {
                path: 'categories',
                component: categories,
            },
            //订单列表
            {
                path: 'orders',
                component: orders,
            },
            //数据统计
            {
                path: 'reports',
                component: reports,
            },
        ]
    }

];

//实例路由
const router = new VueRouter({
    routes,
});

//导航守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth != true) {
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