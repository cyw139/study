import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
// 全局引入Svg-icon
Vue.component('svg-icon', SvgIcon)

// webpack里有个方法：require.context
// 参数1：需要导入的目录
// 参数2：svg目录中不会在嵌套文件夹
// 参数3：正则匹配，加载后缀为.svg的文件
const req = require.context('./svg', false, /\.svg$/)
// keys()返回格式 => ['list.svg', 'route.svg']
req.keys().map(req)
