const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => {
    const html = fs.readFileSync('02/index.html', 'utf8')
    res.send(html)
})

app.listen(8002, () => { console.log('client: http://localhost:8002') })
