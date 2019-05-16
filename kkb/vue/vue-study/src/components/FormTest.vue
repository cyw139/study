<template>
    <div>
        <!--
            1、任务1：实现自定义组件的双向绑定功能
            v-model是语法糖，实现自定义组件的双向绑定需要制定:value和@input即可
            2、任务2：值发生变化，能够通知FormItem组件

        -->
        <h3>KForm 表单</h3>
        <k-form :model="model" :rules="rules" ref="kForm">
            <k-form-item label="用户名：" prop="username">
                <k-input :value="model.username" @input="model.username=$event"></k-input>
                <!--<template v-slot:foo1> foot content1 </template>-->
                <!--<template #foo> foot content </template>-->
            </k-form-item>
            <!--<k-form-item label="密码：" prop="password">-->
                <!--<k-input v-model="model.user"></k-input>-->
            <!--</k-form-item>-->
            <k-form-item label="密码：" prop="password">
                <k-input type="password" :value="model.password" @input="model.password=$event"></k-input>
            </k-form-item>
            <k-form-item>
                <el-button type="primary" @click="submitForm('kForm')">提交</el-button>
            </k-form-item>
        </k-form>

        <h3>Element 表单</h3>
        <el-form v-if="false" :model="model" :rules="rules" ref="loginForm">
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
    import KInput from './KInput.vue'
    import KFormItem from './KFormItem.vue'
    import KForm from "./KForm";
    export default {
        name: "FormTest",
        components: {
            KForm,
            KInput, KFormItem
        },
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
                    if (valid) {
                        alert('请求登录')
                    } else {
                        alert('校验失败')
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>