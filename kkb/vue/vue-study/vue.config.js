// node js code
module.exports = {
    publicPath: '/kcart',
    configureWebpack: {
        // 模拟服务器代码
        devServer: {
            before(app){
                // app 是express实例
                app.get('/goods', (req, res) => {
                    res.json([
                        {id:1, text: 'abc1'},
                        {id:2, text: 'abc2'},
                    ])
                })
            }
        }
    }
}