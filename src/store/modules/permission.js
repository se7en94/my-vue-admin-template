import { asyncRoutes, constantRoutes } from '@/router'
import { getAuthMenu } from '@/api/user'
import Layout from '@/layout'
import mockRoutes from './routes'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: item.path,
      component: item.component === '#' ? Layout : loadView(item.component), // => import(`@/views${item.component}`),
      hidden: item.hidden,
      redirect: item.redirect,
      children: [],
      name: item.name,
      meta: item.meta
    }

    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

const loadView = (view) => {
  return (resolve) => require([`@/views${view}`], resolve)
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      // TODO 模拟数据，后续接入接口！！！ mockdata
      // getAuthMenu(state.token).then(response => {
      //   let data = response
      //   if (response.code !== 200) {
      //     alert(JSON.stringify('菜单数据加载异常'))
      //   } else {
      //     data = response.data
          let data = mockRoutes.mockRoutes
          
          Object.assign(loadMenuData, data)

          const tempAsyncRoutes = Object.assign([], asyncRoutes)

          generaMenu(tempAsyncRoutes, loadMenuData)

          let accessedRoutes
          if (roles.includes('admin')) {
            accessedRoutes = tempAsyncRoutes || []
          } else {
            accessedRoutes = filterAsyncRoutes(tempAsyncRoutes, roles)
          }
          
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
          console.log(accessedRoutes);
          
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
