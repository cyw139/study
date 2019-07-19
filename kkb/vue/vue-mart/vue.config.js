module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/login', (req, res) => {
          const { username, password } = req.query
          if (username === 'kaikeba' && password === '123') {
            res.json({code:1, token: 'jilei'})
          } else {
            res.status(401).json({code:0, message: '用户名或密码错误'})
          }
        })

        function auth(req, res, next) {
          if (req.headers.token) {
            next()
          } else {
            res.status(401)
          }
        }

        app.get('/api/userinfo', auth, (req, res) => {
          res.json({code: 1, data: {name: 'jerry'}})
        })
      }
    }
  }
}
