const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())
app.use(express.static('01/public'))

app.get('/login', (req, res) => {
    res.cookie('token', 'xxxx')
    res.send('ok')
})
app.get('/get', (req, res) => {
    const { token } = req.cookies
    console.log(token)
    res.send(token)
})

app.listen(3001, () => { console.log('listen 3001') })
