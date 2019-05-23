<template>
    <div>
        <h3>商品详情</h3>
        <!-- 路由 -->
        {{$route.params.id}}
        {{id}}
    </div>
</template>

<script>
    export default {
        name: "Detail",
        props: ['id'],
        // 第三种路由守卫：组件内守卫
        beforeRouteEnter(to, from, next) {

        },
        beforeRouteUpdate(to, from, next) {

        },
        beforeRouteLeave(to, from, next) {

        }
    }
</script>

<style scoped>

</style>