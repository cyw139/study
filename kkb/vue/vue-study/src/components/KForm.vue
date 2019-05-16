<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "KForm",
        // provide 与 data相似，返回的对象，可跨层级传参给子代
        provide: function() {
            return {
                form: this // 表单实例传递给后代
            }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object,
                required: false
            }
        },
        methods: {
            async validate(cb) {
                // 执行表单中，所有表单项校验
                const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
                // tasks中任意false就校验失败
                const results = await Promise.all(tasks)
                if (results.some(valid => !valid)) {
                    // 校验失败
                    cb(false)
                } else {
                    // 校验成功
                    cb(true)
                }
            }
        },
    }
</script>

<style scoped>

</style>