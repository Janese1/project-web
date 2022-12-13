import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'  //引入Main.vue组件
import Layout from '@/layout'


Vue.use(VueRouter)

//定义一些路由，数组
const routes = [
    { //每一个链接是一个对象
        path: "/", //链接路径
        redirect: "/main"
    },
    {
        path: '/main', //跳转路径
        name: 'Main', //名称
        component: Main //对应的组件
    },
    {path: "/repository/:repoId", name: "Repository", component: () => import("@/views/Repository")}

]

//创建路由示例
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
