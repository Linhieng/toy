const express = require('express')
const cookieParser = require('cookie-parser')
const https = require('https')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:8003')
    next()
})

app.get('/', (req, res) => {
    res.send('ok')
})
app.get('/login', (req, res) => {
    res
        .cookie("token", 'hello', {
            httpOnly: true,
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


const options = {
    // 通过 mkcert api.localhost 生成证书，并放在用户的 Downloads/api 目录中
    key: fs.readFileSync(process.env.SSL_KEY_API_LOCALHOST || path.join(process.env.HOME, 'Downloads\\api\\api.localhost-key.pem')),
    cert: fs.readFileSync(process.env.SSL_CERT_API_LOCALHOST || path.join(process.env.HOME, 'Downloads\\api\\api.localhost.pem'))
}

// 创建HTTPS服务器
const server = https.createServer(options, app)

// 启动服务器并监听指定端口
const PORT = 3003
server.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`)
})
