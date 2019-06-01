<template>
    <div>
        <h2>用户登录</h2>
        <button @click="onLogin" :disable="loading">{{loading ? '登录中...':'登录'}}</button>
    </div>
</template>

<script>
    import {mapActions}  from "vuex";

    export default {
        name: "Login",
        data() {
            return {
                loading: false
            }
        },
        methods: {
            ...mapActions(['requestLogin']),
            onLogin() {
                this.loading = true
                // 登录成功
                // window.isLogin = true
                // 提交mutations
                // this.$store.commit('login')
                // 派发actions
                // this.$store.dispatch('requestLogin').then(isLogin => {
                this.requestLogin({username: 'tom'}).then(isLogin => {
                    if (isLogin) {
                        this.loading = false
                        // 路由获取查询参数
                        const redirect = this.$route.query.redirect || '/'
                        // 路由到重定向地址, this.$route 是路由器
                        this.$router.push(redirect)
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>