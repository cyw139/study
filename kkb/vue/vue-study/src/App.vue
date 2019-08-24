<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <!--<svg>-->
          <!--<use xlink:href="#icon-route"></use>-->
        <!--</svg>-->
        <svg-icon icon-class="route" />
        Home
      </router-link> |
      <router-link to="/about">About</router-link> |
      <!--<router-link to="/login" v-if="!$store.state.isLogin">Login</router-link>-->
      <!-- 精简写法 -->
      <router-link to="/login" v-if="!isLogin">Login</router-link>
      <span>{{loginState}}</span>
    </div>
    <router-view/>
    {{count}}
    <button @click="onAdd">Add</button>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import kstore from "./kstore"
  // import '@/icons/svg/route.svg'

  export default {
      computed: {
          // 映射的字段
          ...mapState(['isLogin']),
          ...mapGetters(['loginState']),
          count() {
              return kstore.state.count
          }
      },
      methods: {
          onAdd() {
              kstore.commit('add')
          }
      },
  }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
