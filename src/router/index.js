import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'

import FrontPageVue from '@/views/user/FrontPage.vue'
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: LayoutVue, children: [
            { path: '/user/front', component: FrontPageVue },
            { path: '/article/category', component: ArticleCategoryVue},
            { path: '/user/info', component: UserInfoVue },
            { path: '/article/manage', component: ArticleManageVue }
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router
