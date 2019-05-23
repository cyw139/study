<template>
    <div>
        <h2>用户登录</h2>
        <button @click="onLogin">登录</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            onLogin() {
                window.isLogin = true // 登录成功
                // 路由获取查询参数
                const redirect = this.$route.query.redirect || '/'
                // 路由到重定向地址, this.$route 是路由器
                this.$router.push(redirect)
            }
        },
    }
</script>

<style scoped>

</style>