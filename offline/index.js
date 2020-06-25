const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(cors())
app.use(helmet())

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(2629, () => console.log('parcours-online-offline runnin on: http://localhost:2629'))
