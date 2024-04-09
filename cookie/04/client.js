const express = require('express')
const fs = require('fs')
const app = express()

app.get('/', (req, res) => {
    const html = fs.readFileSync('./index.html', 'utf8')
    res.send(html)
})

app.listen(3333, () => {
    console.log('3333');
})
