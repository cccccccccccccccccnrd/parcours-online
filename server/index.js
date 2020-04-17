const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const app = express()

app.get('/api/connected', (req, res) => {
  res.json({ connected: wss.clients.size})
})

app.listen(2626, () => console.log('http://localhost:2626'))

const wss = new WebSocket.Server({ port: 2627 })

function broadcast(ws, data) {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    broadcast(ws, data)
  })
})