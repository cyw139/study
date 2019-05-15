<template>
    <div class="hello">
        <!-- 条件 & 数据绑定（属性绑定、插值绑定） -->
        <p v-if="title" :title="title">{{ title }}</p>
        <!-- 用户输入（事件、双向绑定）-->
        <div>
            <input type="text" v-model="text">
            <button @click="addGood">添加商品</button>
        </div>
        <!-- 循环 -->
        <ul>
            <li v-for="good in goods" :key="good.id">
                <span>{{ good.text }}</span>
                <span>¥{{ good.price }}</span>
                <button @click="addCart(good)">添加购物车</button>
            </li>
        </ul>
        <cart :title="CartTitle" ref="cart" @addCartSuccess="onAddCartSuccess"></cart>
    </div>
</template>

<script>
    import Cart from './Cart.vue';
    export default {
        name: 'HelloWorld',
        components: {
            Cart
        },
        data: function () {
            return {
                CartTitle: '购物车标题',
                title: '',
                text: '',
                goods: [
                    {id: 1, text: 'web全栈课', price: 10000},
                    {id: 2, text: 'java课', price: 10000}
                ]
            }
        },
        created: function () {
            setTimeout(() => {
                this.title = '全栈课程学习-1'
            }, 3000)
        },
        methods: {
            addGood() {
                if (this.text) {
                    this.goods.push({
                        id: this.goods.length + 1,
                        text: this.text,
                        price: 20000
                    })
                    this.text = ''
                }
            },
            addCart(good) {
                // # 解决：父调子函数
                // # 解决一：refs获取对应组件，调用组件内的方法
                // this.$refs.cart.addCart(good)
                // # 解决二：根作用域设置总线，然后父组件派发事件，子组件侦听事件
                this.$bus.$emit('addCart', good)
            },
            onAddCartSuccess() {
                console.log('add cart success')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
