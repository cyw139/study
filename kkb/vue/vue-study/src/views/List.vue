<template>
    <div>
        <!-- 循环 -->
        <ul>
            <li v-for="good in goods" :key="good.id">
                <router-link :to="`/detail/${good.id}`">
                    <span>{{ good.text }}</span>
                    <span>¥{{ good.price }}</span>
                    <button @click.prevent.stop="addCart(good)">添加购物车</button>
                </router-link>
            </li>
        </ul>
        <!--<cart-of-vuex :title="CartTitle" ref="cart" @addCartSuccess="onAddCartSuccess"></cart-of-vuex>-->
        <cart-of-vuex></cart-of-vuex>
    </div>
</template>

<script>
    import CartOfVuex from "../components/CartOfVuex";

    export default {
        name: "List",
        components: {
            CartOfVuex
        },
        data: function() {
            return  {
                goods: [
                    {id: 1, text: 'web全栈课', price: 10000},
                    {id: 2, text: 'java课', price: 10000}
                ]
            }
        },
        methods: {
            addCart(good) {
                // # 解决：父调子函数
                // # 解决一：refs获取对应组件，调用组件内的方法
                // this.$refs.cart.addCart(good)
                // # 解决二：根作用域设置总线，然后父组件派发事件，子组件侦听事件
                // this.$bus.$emit('addCart', good)
                // # 解决三：通过vuex进行处理

            },
        },
    }
</script>

<style scoped>

</style>