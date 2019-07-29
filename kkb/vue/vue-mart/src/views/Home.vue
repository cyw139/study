<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->

    <!-- 轮播图 -->
    <!--<cube-slide :data="slider" :interval="5000">-->
      <!--<cube-slide-item v-for="(item,index) in slider"-->
                       <!--:key="index">-->
        <!--<router-link :to="`/detail/${item.id}`">-->
          <!--<img class="slider" :src="item.img">-->
        <!--</router-link>-->
      <!--</cube-slide-item>-->
    <!--</cube-slide>-->
    <!--&lt;!&ndash; 商品列列表 &ndash;&gt;-->
    <!--<good-list :data="goods"></good-list>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    axios.get('/api/userinfo').then(resp => {
      console.log(resp)
    })
  }
}
</script>
