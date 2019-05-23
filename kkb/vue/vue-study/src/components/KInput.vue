<template>
    <!--
        1、任务1：实现自定义组件的双向绑定功能
            v-model是语法糖，实现自定义组件的双向绑定需要制定:value和@input即可
    -->
    <input :type="type" :value="value" @input="onInput" @blur="onBlur" @change="onChange"/>
</template>

<script>
    export default {
        name: "KInput",
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            },
        },
        methods: {
            onInput(e) {
                // 通知老爹发生了input事件
                this.$emit('input', e.target.value)

                // 通知老爹执行校验
                this.$parent.$emit('validate', 'input')
                // 【lesson1 - 作业3】表单项隔层监听
                // element ui github：https://github.com/ElemeFE/element
                // 参考：https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js
            },
            onBlur(e) {
                // 通知老爹执行校验
                this.$parent.$emit('validate', 'blur')
            },
            onChange(e) {
                // 通知老爹执行校验
                this.$parent.$emit('validate', 'blur')
            }
        },
    }
</script>

<style scoped>

</style>