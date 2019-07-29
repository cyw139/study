<template>
  <div id="app">
    <transition name="route-move">
      <router-view class="child-view" />
    </transition>
    <cube-tab-bar
        v-model="selectLabel"
        :data="tabs"
        @change="changeHandler"
    >
    </cube-tab-bar>
  </div>
</template>

<script>
  export default {
    name: "App1",
    data() {
      return {
        selectLabel: '/',
        tabs: [
          {
            label: 'Home',
            value: '/',
            icon: 'cubeic-home'
          },
          {
            label: 'Cart',
            value: '/cart',
            icon: 'cubeic-mall'
          },
          {
            label: 'Me',
            value: '/about',
            icon: 'cubeic-person'
          }
        ],
      }
    },
    created() {
      // 初始化页签设置，避免页面刷新
      this.selectLabel = this.$route.path
    },
    watch: {
      $route(route) {
        // 监听路由变化并动态设置页签选中状态
        this.selectLabel = route.path
      }
    },
    methods: {
      changeHandler(val) {
        this.$router.push(val)
      }
    },
  }
</script>

<style scoped>
  .cube-tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #9cc8f7;
  }

</style>
