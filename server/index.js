const express = require('express')
const app = express()
const wsServer = require('express-ws')(app)
const aWss = wsServer.getWss()

const PORT = process.env.PORT || 5000

app.ws('/', (ws, req) => {
    console.log('ПОДКЛЮЧЕННо');
    ws.on('message', msg => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection': 
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
                break
        }
    })
    
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}