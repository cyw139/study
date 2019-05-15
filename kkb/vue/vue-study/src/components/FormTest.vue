<template>
    <div>
        <el-form :model="model" :rules="rules" ref="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="model.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
                <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "FormTest",
        data: function() {
            return {
                model: { username: 'tom', password: '' },
                rules: {
                    username: [{required: true, message: '请输入用户名'}],
                    password: [{required: true, message: '请输入密码'}],
                }
            }
        },
        methods: {
            submitForm(ref) {
                this.$refs[ref].validate( valid => {
                    if(valid)
                })
            }
        },
    }
</script>

<style scoped>

</style>