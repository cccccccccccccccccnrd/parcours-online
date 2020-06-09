const path = require('path')
const fs = require('fs')
const probe = require('probe-image-size')
const { google } = require('googleapis')

const state = {
  spreadsheet: '14TnnmZb8hbHHzmuqGwrdWe8abgMrDXeQb0NiKi92VwE',
  auth: null,
  projects: null
}

function init () {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
      if (err) return reject('Error loading client secret file')
      const credentials = JSON.parse(content)
      const { client_secret, client_id, redirect_uris } = credentials.installed
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

      fs.readFile(path.join(__dirname, 'token.json'), (err, token) => {
        if (err) return reject('Error loading token')
        const tokens = JSON.parse(token)
        oAuth2Client.setCredentials({
          refresh_token: tokens['refresh_token']
        })
        state.auth = oAuth2Client
        console.log('Db authenticated')
        return resolve('Db authenticated')
      })
    })
  })
}

function getValues(graduate) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.get({
      spreadsheetId: state.spreadsheet,
      range: `\'${ graduate.name }\'!B1:B20`,
    }, (err, res) => {
      if (err) return reject('Error while getting values')
      try {
        const column = res.data.values.flat()
        return resolve({
          id: `${ graduate.name.toLowerCase().split(' ').join('-') }-${ graduate.id }`,
          graduate: graduate.name,
          title: column[0],
          sub: column[1],
          type: column[2],
          supervision: column[3],
          expertise: column[4],
          tags: column[5],
          content: [
            column[7],
            column[8],
            column[9],
            column[10],
            column[11],
            column[12]
          ],
          thumbnail: column[13],
          chat: column[14] ? JSON.parse(column[14]) : []
        })
      } catch(error) {
        return reject('Error while getting values')
      }  
    })
  })
}

function getGraduates () {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.get({
      spreadsheetId: state.spreadsheet,
    }, (err, res) => {
      if (err) return reject('Error while getting graduates')
      const graduates = res.data.sheets.map((sheet) => {
        return {
          id: sheet.properties.sheetId,
          name: sheet.properties.title
        }
      })
      console.log(`Db fetched ${ graduates.length } graduates`)
      return resolve(graduates)
    })
  })
}

async function distribute(values) {
  return new Promise(async (resolve, reject) => {
    const width = 2500
    const height = 2500
    const thresh = 10
    let thumbs = []

    const artworks = await Promise.all(values.map(async (value) => {
      return {
        dimensions: await probe(value.thumbnail),
        id: value.id
      }
    }))
    
    while (thumbs.length !== artworks.length) {
      for (const artwork of artworks) {
        const thumb = {
          id: artwork.id,
          x: random(0, width),
          y: random(0, height),
          w: artwork.dimensions.width,
          h: artwork.dimensions.height,
        }
        
        let overlapping = false

        for (let j = 0; j < thumbs.length; j++) {
          const other = thumbs[j]

          const cx = thumb.x + thumb.w / 2
          const cy = thumb.y + thumb.h / 2
    
          const cotherx = other.x + other.w / 2
          const cothery = other.y + other.h / 2
    
          const dx = Math.abs(cx - cotherx)
          const dy = Math.abs(cy - cothery)
    
          if (thumb.w / 2 + other.w / 2 + thresh > dx && thumb.h / 2 + other.h / 2 + thresh > dy) {
            overlapping = true
            break
          }
        }

        const exists = thumbs.find((existing) => existing.id === thumb.id)

        if (!overlapping && !exists) {
          thumbs.push(thumb)
        }
      }
    }

    const distributed = values.map((value) => {
      const yes = thumbs.find((thumb) => thumb.id === value.id)
      value.position = {
        x: yes.x,
        y: yes.y
      }
      return value
    })

    console.log('placed all artworks')
    return resolve(distributed)
  })
}

async function getProjects (randomize) {
  const graduates = await getGraduates()
  const values = await Promise.all(graduates.map(async (graduate) => {
    return await getValues(graduate)
  }))

  if (randomize) {
    const distributed = await distribute(values)
    state.projects = distributed
    return distributed
  } else {
    return await Promise.all(values.map((value) => {
      const yes = state.projects.find((project) => project.id === value.id)
      value.position = yes.position
      return value
    }))
  }
}

function getMessages (name) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.get({
      spreadsheetId: state.spreadsheet,
      range: `\'${ name }\'!B20`,
    }, (err, res) => {
      if (err) return reject('Error while getting values')
      if (res.data.values) {
        const column = res.data.values.flat()
        resolve(JSON.parse(column[0]))
      } else {
        resolve([])
      }
    })
  })
}

async function storeMessage (name, message) {
  const messages = await getMessages(name)
  messages.push(message)

  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.update({
      spreadsheetId: state.spreadsheet,
      range: `\'${ name }\'!B20`,
      valueInputOption: 'RAW',
      resource: { values: [[JSON.stringify(messages)]] },
    }, (err, res) => {
      if (err) return reject('Error while storing message', error)
      return resolve('Stored message')
    })
  })
}

function checkSecret(name, content) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.get({
      spreadsheetId: state.spreadsheet,
      range: `\'${ name }\'!B21`,
    }, (err, res) => {
      if (err) return reject('Error while checking secret')
      try {
        const column = res.data.values.flat()
        if (column[0] && content === column[0]) {
          return resolve(true)
        } else {
          return resolve(false)
        }
      } catch(error) {
        return reject('Error while checking secret')
      }  
    })
  })
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

exports.init = init
exports.getProjects = getProjects
exports.storeMessage = storeMessage
exports.checkSecret = checkSecret
