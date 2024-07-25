'use strict'

const session = require('express-session')
const express = require('express')
const http = require('http')
const uuid = require('uuid')
const { WebSocketServer } = require('ws')
const { logUrlWithPort } = require('./utils')
const fs = require('fs')

function onSocketError(err) {
    console.error(err)
}

const app = express()
const PORT = 8080
const map = new Map()

//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
})

//
// Serve static files from the 'public' folder.
//
app.use(express.static('client'))
app.use(sessionParser)

app.post('/login', function (req, res) {
    //
    // "Log in" user and set userId to session.
    //
    const id = uuid.v4()

    console.log(`Updating session for user ${id}`)
    req.session.userId = id
    res.send({ result: 'OK', message: 'Session updated' })
})

app.delete('/logout', function (request, response) {
    const ws = map.get(request.session.userId)

    console.log('Destroying session')
    request.session.destroy(function () {
        if (ws) ws.close()

        response.send({ result: 'OK', message: 'Session destroyed' })
    })
})

//
// Create an HTTP server.
//
const server = http.createServer(app)

//
// Create a WebSocket server completely detached from the HTTP server.
//
const wss = new WebSocketServer({ clientTracking: false, noServer: true })

server.on('upgrade', function (request, socket, head) {
    socket.on('error', onSocketError)

    console.log('Parsing session from request...')

    sessionParser(request, {}, () => {
        if (!request.sessionID) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
            socket.destroy()
            return
        }

        console.log('Session is parsed!')

        socket.removeListener('error', onSocketError)

        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request)
        })
    })
})

wss.on('connection', function (ws, request) {
    const userId = request.sessionID

    map.set(userId, ws)

    ws.on('error', console.error)

    ws.on('message', function (message) {
        //
        // Here we can now use session parameters.
        //
        console.log(`Received message ${message.slice(0, 10)}${message.length > 10 ? '...' : ''} from user ${userId}`)
        fs.writeFileSync(Date.now() + '.txt', message, )
    })

    ws.on('close', function () {
        map.delete(userId)
    })
})

//
// Start the server.
//
server.listen(PORT, () => {
    console.log(logUrlWithPort(PORT))
})
