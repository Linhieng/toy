const express = require('express')
const {resolve} = require('path')
const logUrlWithPort = require('@linhieng/misc-utils').logUrlWithPort

const app = express()
const PORT = 8080

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/index.html')
})

app.get('/result.json', (req, res) => {
    res.sendFile(resolve('./result.json'))
})

app.listen(PORT, () => {
    console.log(logUrlWithPort(PORT))
})
