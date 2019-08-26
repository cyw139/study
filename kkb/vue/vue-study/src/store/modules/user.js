// 解决三个问题

import { getToken, setToken, removeToken } from '@/utils/auth'

// 存储用户令牌和角色信息
const state = {
  token: getToken(),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  set_ROLE: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username } = userInfo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' || username === 'jerry') {
          commit('SET_TOKEN', username)
          setToken(username)
          resolve()
        } else {
          reject('用户名、密码错误')
        }
      }, 1000)
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roles = state.token ==='admin' ? ['admin'] : ['editor']
        commit('SET_ROLEs', roles)
        resolve({roles})
      }, 1000)
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('set_ROLE', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
