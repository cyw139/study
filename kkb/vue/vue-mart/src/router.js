import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'

Vue.use(Router)

// 全局路由守护
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        // 新增登录组件Login
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/about',
            name: 'about',
            meta: { auth: true }, // 需要校验
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
  // 当前路由是否需要登录
    if (to.meta.auth) {
        // 只要本地有token就认为登录了
        const token = localStorage.getItem('token')
        if (token) {
          next()
        } else {
          // 未登录
            next({
                path: '/login',
                query: { redirect: to.path}
            })
        }
    } else {
      next()
    }
})

export default router
