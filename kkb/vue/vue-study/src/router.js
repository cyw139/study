import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import List from './views/List.vue'
import Detail from './views/Detail.vue'
import CartOfVuex from './components/CartOfVuex.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                { path: '', component: List }, // 默认响应子路由
                {
                    path: '/detail/:id', // 路由传参
                    component: Detail,
                    props: true // 用属性的方式传参。true参数调用 id，false参数调用 $route.params.id
                },
                {
                    path: '/cart', // 路由传参
                    component: CartOfVuex,
                    props: true // 用属性的方式传参。true参数调用 id，false参数调用 $route.params.id
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/about',
            name: 'about',
            // 第二种路由守卫：路由独享守卫
            beforeEnter(to,from,next) {
                // 判断是否登录
                // console.log(to.path)
                console.log(store)
                // if (!store.state.isLogin) { // !window.isLogin
                if (!store.state.defaultStore.isLogin) { // !window.isLogin
                    next('/login?redirect=' + to.path)
                } else {
                    next()
                }
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})

// 第一种路由守护，每次路由激活之前，都会执行回调函数
/**
 * 完整导航解析流程
 * 1、导航被触发
 * 2、调用全局的beforeEach守卫
 * 3、在重用的组件里调用beforeRouteUpdate守卫
 * 4、在路由配置里调用beforeEnter
 * 5、在被激活的组件里调用beforeRouteEnter
 * 6、调用全局beforeResolve守卫（2.5+）
 * 7、导航被确认
 * 8、调用全局的afterEach钩子
 * 9、触发Dom更新
 */
// router.beforeEach((to,from,next) => {
//     // 判断是否登录
//     // console.log(to.path)
//     if (to.path === '/about' && !store.state.isLogin) { // !window.isLogin
//         next('/login?redirect=' + to.path)
//     } else {
//         next()
//     }
// })

export default router
