const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
//https://segmentfault.com/a/1190000022096603 webpack-dev-middleware 源码解读
const webpackDevMiddleware = require('webpack-dev-middleware')
//web负责热更新的模块
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

// 简而言之 webpack将打包一些资源到对应文件夹让express访问
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
router.get('/simple/get', (req, res) => {
    res.json({
        msg: `hello, world`
    })
})
router.get('/base/get', (req, res) => {
  res.json(req.query)
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
