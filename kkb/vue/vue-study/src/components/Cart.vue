<template>
    <table border="1">
        <caption>{{ title }}</caption>
        <thead>
        <tr>
            <th></th>
            <th>课程名</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="c in cart" :key="c.id" :class="{inactive: !c.active}">
            <td><input type="checkbox" v-model="c.active"></td>
            <td>{{c.text}}</td>
            <td>¥{{c.price}}</td>
            <td>{{c.count}}</td>
            <td>¥{{c.count * c.price}}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="4">总计：{{total}}</td>
            <td></td>
        </tr>
        </tfoot>
    </table>
</template>

<script>
    export default {
        name: "Cart",
        // 组件通信，第一种情况：【==父传子==】props数据传输
        props: {
            title: {
                type: String,
                default: function () {
                    return ''
                }
            }
        },
        data: function () {
            return {
                // 购物车，数据结构 {id: 1, text: 'web全栈课', price: 10000, count: 1},
                // 数据持久化，从localStorage中获取数据
                cart: JSON.parse(localStorage.getItem('cart')) || []
            }
        },
        created: function () {
            this.$bus.$on('addCart', good => this.addCart(good))
        },
        methods: {
            addCart(good) {
                // 寻找购物车里是否有已存在的商品对象，返回找到的对象
                const ret = this.cart.find(v => v.id === good.id)
                if (ret) {
                    ret.count += 1
                } else {
                    // 对象全部展开 ...good
                    // 添加激活属性 active
                    this.cart.push({...good, count: 1, active: true})
                }
                // 子组件通知父组件
                this.$emit('addCartSuccess')
            }
        },
        computed: {
            total() {
                return this.cart.reduce((sum, c) => {
                    if (c.active) {
                        sum += c.price * c.count
                    }
                    return sum
                }, 0)
            }
        },
        watch: {
            // 1、浅层侦听处理，count数据无法同步进行变化
            // cart(newValue) {
            //    localStorage.setItem('cart', JSON.stringify(newValue))
            // }
            // 2、深层侦听处理，count同步变化
            cart: {
                immediate: true,
                deep: true,
                handler(newValue) {
                    localStorage.setItem('cart', JSON.stringify(newValue))
                }
            }
        }
    }
</script>

<style scoped>
    .inactive {
        color: gray;
    }
</style>