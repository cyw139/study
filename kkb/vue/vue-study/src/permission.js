// 路由的全局守卫
// 权限控制逻辑在这里
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 存储于cookie里

const whiteList = ['/login'] // 白名单

router.beforeEach(async(to, from, next) => {
  //获取令牌判断用户是否登录
  const hasToken = getToken()

  if (hasToken) { // 有令牌，已登录
    if (to.path === '/login') { // 访问登录页，重定向到首页
      // 若已登录重定向至首页
      next({ path: '/' })
    } else { // 已登录，判断权限
      // 若用户角色已附加则说明动态路由已添加
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next() // 继续即可
      } else {
        try {
          // 先请求获取用户信息
          const { roles } = await store.dispatch('user/getInfo')
          // 根据当前用户角色动态生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 添加这些路由至路由器
          router.addRoutes(accessRoutes)
          // 继续路由切换，确保addRoutes完成
          next({...to, replace: true })
        } catch (e) {
          // 出错需重置令牌并重新登录（令牌过期，网络错误等原因）
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 用户无令牌
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单路由放过
      next()
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})
