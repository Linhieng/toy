const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', 'http://www.hello.localhost')
    next()
})

app.get('/', (req, res) => {
    console.log(req.cookies)
    res.cookie('token', '12322', { domain: '.hello.localhost', })
    res.send('hello')
})

app.listen(8888, () => {
    console.log('hello')
})
