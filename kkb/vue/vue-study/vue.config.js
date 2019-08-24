// commonjs node js code
const port = 7070
const title = 'vue项目最佳实践'
const path = require('path')

// 解析相对路径为绝对路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: '/kcart',
  publicPath: 'best-practice', // 部署应用包时的基本 URL
  devServer: {
    port
  },
  configureWebpack: {
    // 向index.html注入标题
    name: title
    // 模拟服务器代码
    // devServer: {
      // before(app) {
      //   // app 是express实例
      //   app.get('/goods', (req, res) => {
      //     res.json([
      //       {id: 1, text: 'abc1'},
      //       {id: 2, text: 'abc2'},
      //     ])
      //   })
      // }
    // }
  },
  // 链式配置，对config进行链式操作
  chainWebpack(config) {
    // 任务1：svg规则配置一下，排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
      .end() // end可退回上一级

    /*
    > vue inspect --rule icons
    / * config.module.rule('icons') * /
    {
      test: /\.svg$/,
        include: [
      '/Users/sam/docker/v2/sites/study/kkb/vue/vue-study/src/icons'
    ],
      use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
    }
    */
    // 任务2：新增icons规则，设置svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({symbolId: 'icon-[name]'}) //将来使用图标的名称
      .end()

  }
}
