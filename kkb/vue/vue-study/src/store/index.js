import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'

Vue.use('Vuex')

const store = new Vuex.Store({
  modules: { permission, user },
  // 全局定义getters便于访问
  getters: {
    roles: state => state.user.roles
  }
})

export default store
