<template>
  <!--参考文件，解释$listeners ===>> https://zhuanlan.zhihu.com/p/44699947 -->
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners" >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return 'svg-icon ' + this.className
    }
  },
  created() {
    // console.log(11)
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
