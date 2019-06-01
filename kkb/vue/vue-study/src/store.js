import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 如何模块化
// 默认存储设置，可以放到其他文件里
const defaultStore = {
    state: {
        isLogin: false
    },
    getters: {
        loginState(state) {
            return state.isLogin ? '欢迎回来' : '游客'
        }
    },
    mutations: {
        login(state) {
            state.isLogin = true
        }
    },
    actions: {
        // requestLogin(context, payload) {
        // 可直接解构对象
        requestLogin({commit}, payload) {
            console.log(payload)
            // console.log(context, payload)
            return new Promise(resolve => {
                setTimeout(() => {
                    // context.commit('login')
                    commit('login')
                    return resolve(true)
                }, 1000)
            })
        }
    }
}
// 购物车
const cart = {
    state: {
        list: []
    },
    mutations: {
        addCart(state, good) {
            const ret = this.state.cart.find(v => v.id === good.id)
            if (ret) {
                ret.count = 1
                this.state.cart.push(ret)
            } else {
                this.state.cart.push({...good, count: 1, active: true})
            }
        }
    }
}

export default new Vuex.Store({
    modules: {
      defaultStore
    }
})
