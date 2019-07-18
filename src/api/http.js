//导入axios
import axios from 'axios';

//导入router
import router from '../router/router';

//创建axios
const backstage = axios.create({
    //设置基地址
    baseURL: 'http://localhost:8888/api/private/v1/',
});

//axios的拦截器

// 添加请求拦截器
backstage.interceptors.request.use(function (config) {
    // 在发送请求之前做一些事情
    //添加token
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
}, function (error) {
    // 请求失败做一些的事情
    return Promise.reject(error);
});

// 添加响应拦截器
backstage.interceptors.response.use(function (response) {
    // 做一些响应回来后做的事情
    //判断是否是有效的token
    if (response.data.meta.status == 400 || response.data.meta.msg == "无效token") {
        //无效删除伪造token
        window.sessionStorage.clear();
        //回到登录页
        router.push('/login');
    }
    return response;
}, function (error) {
    // 做一些响应错误的事情
    return Promise.reject(error);
});

//暴露接口 --登录
export const login = ({ username, password }) => {
    return backstage.post('login', {
        username,
        password
    })
};
//暴露接口 --菜单权限
export const menus = () => {
    return backstage.get('menus')
};
//暴露接口 --获取用户
export const users = (query,pagenum, pagesize) => {
    return backstage.get('users', {
        params: {
            query,
            pagenum,
            pagesize,
        }
    })
};
//暴露接口 --添加用户
export const adduser = ({ username, password, email, mobile }) => {
    return backstage.post('users', {
        username,
        password,
        email,
        mobile
    })
};
//暴露接口 --用户状态
export const userstate = (uId, type) => {
    return backstage.put(`users/${uId}/state/${type}`)
};
//暴露接口 --根据id获取用户
export const getuser = (id) => {
    return backstage.get(`users/${id}`)
};
//暴露接口 --修改用户
export const amenduser = ({ id, email, mobile }) => {
    return backstage.put(`users/${id}`, {
        email,
        mobile
    })
};
//暴露接口 --删除用户
export const removeuser = (id) => {
    return backstage.delete(`users/${id}`);
};
//暴露接口 --角色列表
export const roleList = () => {
    return backstage.get('roles')
};
//暴露接口 --角色分配
export const allotpart = ({id,rid}) => {
    return backstage.put(`users/${id}/role`,{
        rid,
    })
};
//暴露接口 --添加角色
export const appendRole = ({roleName,roleDesc}) => {
    return backstage.post('roles',{
        roleName,
        roleDesc,
    })
};
//暴露接口 --编辑角色   
export const sureEditRole = ({id,roleName,roleDesc}) => {
    return backstage.put(`roles/${id}`,{
        roleName,
        roleDesc,
    })
};
//暴露接口 --删除角色
export const deleterole = ({id}) => {
    return backstage.delete(`roles/${id}`)
}