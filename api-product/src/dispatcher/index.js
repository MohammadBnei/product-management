const EventEmitter = require('events')
const v4 = require('uuid').v4
const eventEmitter = new EventEmitter()

let clients = []

const CONNECTION = 'CONNECTION'
const DISCONNECTED = 'DISCONNECTED'
const UPDATE = 'UPDATE'
const REMOVED = 'REMOVED'

eventEmitter.on(CONNECTION, (client) => {
    clients.push(client)
    console.log({ clients }, 'connected');
})

eventEmitter.on(DISCONNECTED, id => {
    clients = clients.filter(({ id: _id }) => id === _id)
    console.log({ clients }, 'disconnected');
})

eventEmitter.on(UPDATE, (payload) => {
    for (const { res } of clients) {
        res.write(`data: ${JSON.stringify(payload)} \n\n`)
    }
})
eventEmitter.on(REMOVED, (payload) => {
    for (const { res } of clients) {
        res.write(`data: ${JSON.stringify({ removed: true, ...payload })} \n\n`)
    }
})

function clientHandler(req, res) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no'
    }

    res.writeHead(200, headers)
    res.write('connected\n\n')

    const id = v4()
    eventEmitter.emit(CONNECTION, { res, id })

    // req.on('close', () => {
    //     eventEmitter.emit(DISCONNECTED, id)
    // })
}

const clientRouter = require('express').Router()

clientRouter.get('/', clientHandler)

module.exports = {
    eventEmitter,
    UPDATE,
    REMOVED,
    clientRouter: (app) => app.use('/events', clientRouter)
};
