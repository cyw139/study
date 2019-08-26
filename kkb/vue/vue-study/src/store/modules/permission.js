import { asyncRoutes, constRoutes } from "@/router"

/**
 * 根据路由meta.role确定是否当前用户拥有访问权限
 * @param roles 用户拥有角色
 * @param route 待判定路由
 */
function hasPermission(roles, route) {
  // 如果当前路由有roles字段，则需判断用户访问权限
  if (route.meta && route.meta.roles) {
    // 若用户拥有的角色中有被包含在待判定路由角色中的，则拥有访问权
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有设置roles则无需判定即可访问
    return true
  }
}

/**
 * 递归过滤AsyncRoutes路由表
 * @param routes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {

}

const mutations = {
  SET_ROUTES: (state, routes) => {

  }
}
