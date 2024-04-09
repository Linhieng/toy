const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const path = require('path')

app.get('/', (req, res) => {
    const html = fs.readFileSync('03/index.html', 'utf8')
    res.send(html)
})

const options = {
    // 通过 mkcert localhost 生成证书，并放在用户的 Downloads 目录中
    key: fs.readFileSync(process.env.SSL_KEY_LOCALHOST || path.join(process.env.HOME, 'Downloads\\localhost+1-key.pem')),
    cert: fs.readFileSync(process.env.SSL_CERT_LOCALHOST || path.join(process.env.HOME, 'Downloads\\localhost+1.pem'))
}

// 创建HTTPS服务器
const server = https.createServer(options, app)

// 启动服务器并监听指定端口
const PORT = 8003
server.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`)
})
