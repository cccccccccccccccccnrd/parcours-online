const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const WebSocket = require('ws')

const db = require('./db.js')

const state = {
  updated: {
    content: null,
    distribution: null,
  },
  projects: null,
  program: null,
  logins: {}
}

setInterval(async () => {
  state.projects = await getProjects()
}, 1 * 60 * 1000)

setInterval(async () => {
  state.projects = await getProjects(true)
}, 1 * 60 * 60 * 1000)

async function getProjects (randomize) {
  try {
    const projects = await db.getProjects(randomize)
    if (randomize) {
      state.updated.content = Date.now()
      state.updated.distribution = Date.now()
    } else {
      state.updated.content = Date.now()
    }
    return projects
  } catch (error) {
    console.log('Error while parsing values, using prev projects')
    return state.projects
  }
}

async function init () {
  await db.init()
  state.projects = await getProjects(true)
  state.program = await db.getProgram()
}

init()

const app = express()

app.use(cors())
app.use(helmet())

app.get('/meta', (req, res) => {
  res.json({
    connected: wss.clients.size,
    projects: state.projects.length,
    updated: {
      content: state.updated.content,
      distribution: state.updated.distribution
    }
  })
})

app.get('/info', (req, res) => {
  res.send(`<h1 style="font-family: Arial; font-size: 4em; font-weight: normal; text-transform: uppercase;">${ wss.clients.size } users and ${ state.projects.length } projects are online. Content will be updated in ${ Math.trunc((1 * 60 * 1000 - (Date.now() - state.updated.content)) / 1000) } seconds, new distribution in ${ Math.trunc((1 * 60 * 60 * 1000 - (Date.now() - state.updated.distribution)) / 1000) }.</h1>`)
})

app.get('/projects', async (req, res) => {
  const projects = await Promise.all(state.projects.map(async (project) => {
    project.chat = await db.getMessages(project.id)
    return project
  }))
  res.json(projects)
})

app.get('/program', async (req, res) => {
  res.json(state.program)
})

app.listen(2628, () => console.log('parcours-online-server runnin on: http://localhost:2628'))

const wss = new WebSocket.Server({ port: 2627 })

function broadcast (ws, data) {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

function logout (id) {
  if (id in state.logins) {
    console.log(`${ id } logged out of ${ state.logins[id] }`)
    delete state.logins[id]
  }
}

async function login (ws, msg) {
  const check = await db.checkSecret(msg.payload.graduate, msg.payload.content)

  const reply = {
    payload: {
      location: msg.payload.location,
      graduate: msg.payload.graduate
    }
  }

  if (check) {
    state.logins[msg.id] = msg.payload.location
    console.log(`${ msg.id } logged in ${ state.logins[msg.id] }`)
    reply.type = 'login-success'
  } else {
    reply.type = 'login-error'
  }

  ws.send(JSON.stringify(reply))
}

wss.on('connection', (ws) => {
  ws.on('message', async (data) => {
    const msg = JSON.parse(data)

    switch (msg.type) {
      case 'chat-message':
        if (msg.payload.mode === 'login') {
          return login(ws, msg)
        } else if (msg.payload.location !== 'global') {
          db.storeMessage(msg.payload.location, msg)
        }
        
        if (msg.payload.amIloggedIn) {
          if (msg.id in state.logins) {
            if (state.logins[msg.id] === msg.payload.location) {
              delete msg.payload.amIloggedIn
              msg.payload.loggedIn = true
              return broadcast(ws, JSON.stringify(msg))
            }
          }
        }
      case 'close':
        if (msg.id in state.logins) {
          logout(msg.id)
        }
        break
    }

    broadcast(ws, data)
  })
})
