const express = require('express')
const userRouter = require('./router/user')
const app = express()
const port = 3000
//设置允许跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS')
    if (req.method === 'OPTIONS') {
        res.statusCode = 200
        res.end()
    } else {
        next()
    }
})
// 使用json格式接收数据
app.use(express.json())
// 对外暴露对应的路由（接口）
app.use('/api/user', userRouter)
// 服务运行在3000端口
app.listen(port, () => {
    console.log('app is running in localhost:3000')
})