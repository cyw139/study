<template>
    <!--
        1、任务1：实现自定义组件的双向绑定功能
            v-model是语法糖，实现自定义组件的双向绑定需要制定:value和@input即可
    -->
    <input :type="type" :value="value" @input="onInput"/>
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
                this.$parent.$emit('validate')
            }
        },
    }
</script>

<style scoped>

</style>