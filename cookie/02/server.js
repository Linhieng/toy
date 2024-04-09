const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

app.use((req, res, next) => {
    // 使用第三方 cookie 需要在响应标体中配置下面这两项，注意 origin 不能为 *
    // 同时，客户端请求时也需要配置 Credentials。具体请看 index.html 中的代码
    // 还有一点需要注意的是 origin 中 localhost 和 127.0.0.1 是不同的，http 和 https 也是不同的
    // 设置第三方 cookie 是要求必须是 https
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost')
    next()
})

app.get('/', (req, res) => {
    res.send('ok')
})
app.get('/login', (req, res) => {
    res.cookie("token", 'foobar', {
            // 单位毫秒。不设置时默认是 session
            // maxAge: '30000',
            // 不设置这两项，则 cookie 会被阻止，可以在浏览器 devtool 中查看
            sameSite: 'none',
            secure: true,
        })
    res.send('ok')
})
app.get('/get', (req, res) => {
    const { token } = req.cookies
    console.log(token)
    res.send(token)
})

app.listen(3002, () => { console.log('listen 3002') })
