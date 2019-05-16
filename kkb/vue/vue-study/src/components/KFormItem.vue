<template>
    <div>
        <label v-if="label">{{label}}</label>
        <!-- 插槽 -->
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name="foo"></slot>
        <slot name="foo1"></slot>
        <!-- 校验错误信息 -->
        <p v-if="errorMessage" class="error">{{errorMessage}}</p>
    </div>
</template>

<script>
    import Validator from 'async-validator'
    export default {
        name: "KFormItem",
        inject: ['form'],
        components: {
            Validator
        },
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            },
        },
        data: function() {
            return {
                errorMessage: ''
            }
        },
        created: function() {
            this.$on('validate', this.validate)
        },
        methods: {
            validate() {
                return new Promise(resolve => {
                    // console.log('执行校验')
                    // 需要插件：async-validator
                    // 校验规则指定
                    // es6语法：计算属性 [this.prop]
                    const descriptor = { [this.prop]: this.form.rules[this.prop] }
                    // console.log(descriptor)
                    // 创建校验器
                    const validator = new Validator(descriptor)
                    // 执行校验
                    validator.validate({ [this.prop]: this.form.model[this.prop] }, errors => {
                        if (errors) {
                            // 显示错误信息
                            this.errorMessage = errors[0].message
                            resolve(false)
                        } else {
                            this.errorMessage = ''
                            resolve(true)
                        }
                    })
                })
            }
        },
    }
</script>

<style scoped>
.error { color: red;}
</style>