import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

// 通用页面，这里的配置不需要权限
export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/practice/Login.vue'),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: '/',
    component: Layout, // 应用布局
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: 'Home', // 导航菜单项标题
          icon: 'route' // 导航菜单项图标
        }
      }
    ]
  }
]

// 权限页面
export const asyncRoutes = [
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/About.vue'),
        name: 'about',
        mata: {
          title: 'About',
          icon: 'route',
          roles: ['admin', 'editor']
        }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  base: process.env.Base_URL,
  routes: constRoutes
})
