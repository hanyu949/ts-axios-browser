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
    res.json(Object.assign({
      msg: `hello, world`
  }, req.query))
})

// Q: 为什么这里可以直接返回req.query 我传进来的是encode之后的参数。如果不encode会怎么样？
router.get('/base/get', (req, res) => {
  res.json(req.query)
})
router.post('/base/post', function(req, res) {
  res.json(req.body)
})
router.post('/extend/post', function(req, res) {
  res.json(req.body)
})
router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})
router.get('/error/get', function(req, res) {
  if (Math.random() > 0.9) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})
router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})
router.get('/extend/get', (req, res) => {
  res.json(req.query)
})
router.get('/interceptor/get', (req, res) => {
  res.json(req.query)
})


app.use(router)

const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
