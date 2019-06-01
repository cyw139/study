<template>
    <table border="1">
        <!--<caption>{{ title }}</caption>-->
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
    import { mapState } from 'vuex'

    export default {
        name: "CartOfVuex",
        computed: {
            ...mapState({
                cart: state => state.cart.list
            })
        }
    }
</script>

<style scoped>
    .inactive {
        color: gray;
    }
</style>