const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

const { verifyJWT } = require('../token')

let clients = []

const CONNECTION = 'CONNECTION'
const DISCONNECTED = 'DISCONNECTED'
export const UPDATE = 'UPDATE'

eventEmitter.on(CONNECTION, ({ marchandId, res }) => {

    const client = {
        id: Date.now(),
        marchandId,
        res
    }
    clients.push(client)
})

eventEmitter.on(DISCONNECTED, id =>
    clients = clients.filter(({ id: _id }) => id === _id)
)

eventEmitter.on(UPDATE, (payload) => {
    for (const { res } of clients) {
        res.write(`data: ${JSON.stringify(payload)}`)
        res.write('\n\n')
    }
})

function clientHandler(req, res) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    }

    res.writeHead(200, headers)
    res.write('connected\n\n')

    const { userId } = req.token

    console.log(`Client connected with marchand id : ${userId}`)
    const id = Date.now()
    eventEmitter.emit(CONNECTION, { id, res, userId: userId })

    req.on('close', () => {
        console.log(`Client Disconnected with marchand id : ${userId}`)
        eventEmitter.emit(DISCONNECTED, id)
    })
}

const clientRouter = require('express').Router()

clientRouter.get('/:token', verifyJWT, clientHandler)

module.exports = {
    eventEmitter,
    clientRouter
};
