//导入axios
import axios from 'axios';

//创建axios
const backstage = axios.create({
    //设置基地址
    baseURL: 'http://localhost:8888/api/private/v1/',
})

//暴露接口 --登录
export const login = ({ username, password }) => {
    return backstage.post('login', {
        username,
        password
    })
};
//暴露接口 --菜单权限
export const menus = () => {
    return backstage.get('menus',{
        headers: {
            Authorization:window.sessionStorage.getItem('token'),
        }
    })
};