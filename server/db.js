require('dotenv').config()
const path = require('path')
const fs = require('fs')
const probe = require('probe-image-size')
const { google } = require('googleapis')
const db = require('monk')(`${ process.env.DB_USER }:${ process.env.DB_PASS }@${ process.env.DB_HOST }/parcours-online`)
const chats = db.get('chats')

db.then(() => console.log('Connected to db'))

const state = {
  sheets: {
    database: '1WN2STbr8gGTS2NKCFWG6p6u2_rHF5jG9SLx4v_5V3gY',
    program: '1fHFNk5wUfTQEhN_RMK2plde1alI50oZfQ0GZ87JFkjw',
  },
  auth: null,
  projects: []
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
      spreadsheetId: state.sheets.database,
      range: `\'${ graduate.name }\'!B1:B100`,
    }, (err, res) => {
      if (err) {
        console.log(err)
        return reject('Error while getting values')
      }
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
            column[6],
            column[7],
            column[8],
            column[9],
            column[10],
            column[11]
          ],
          picture: column[12],
          mail: column[13],
          link: column[14],
          externals: [{
            title: column[15].split(',')[0].trim(),
            url: column[15].split(',')[1].trim()
          }, {
            title: column[16].split(',')[0].trim(),
            url: column[16].split(',')[1].trim()
          }],
          thumbnail: column[17],
          chat: column[19] ? JSON.parse(column[19]) : []
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
      spreadsheetId: state.sheets.database,
    }, (err, res) => {
      if (err) {
        console.log(err)
        return reject('Error while getting graduates')
      }
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
    const width = 5000
    const height = 5000
    const courtyardw = 1200   //1100 + 100px safespace
    const courtyardh = 750    //650 + 100px safespace
    const border = 100
    const thresh = 10
    let thumbs = []

    const artworks = await Promise.all(values.map(async (value) => {
      try {
        return {
          dimensions: await probe(value.thumbnail),
          id: value.id
        }
      } catch(error) {
        console.log(value.graduate, error)
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

          //protection area around the courtyard
          if (thumb.x > width / 2 - courtyardw / 2  && thumb.x < width / 2 + courtyardw / 2  || thumb.x + thumb.w > width / 2 - courtyardw / 2 && thumb.x + thumb.w < width / 2 + courtyardw / 2) {
            if (thumb.y >= height / 2 - courtyardh / 2 && thumb.y < height / 2 + courtyardh / 2  || thumb.y + thumb.h >= height / 2 - courtyardh / 2 && thumb.y + thumb.h < height / 2 + courtyardh / 2 ) {
              console.log(Date.now(), 'overlapping courtyard, retry')
              overlapping = true
              break
            }
          }

          // protection area bottom and right
          if (thumb.w + thumb.x > width - border || thumb.h + thumb.y > height - border || thumb.x < border || thumb.y < border) {
            console.log(Date.now(), 'placement out of window, retry')
            overlapping = true
            break
          }

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

      console.log(Date.now(), 'overlapping another artwork, retry')
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
    console.log(artworks.sort((a, b) => a.dimensions.length - b.dimensions.length))
    return resolve(distributed)
  })
}

async function getProjects (randomize) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.get({
      spreadsheetId: state.sheets.database,
      includeGridData: true
    }, async (err, res) => {
      if (err) {
        console.log(err)
        return reject('Error while getting projects')
      }
      const sheets = res.data.sheets
      const values = await Promise.all(sheets.map(async (sheet) => {
        const sheetId = sheet.properties.sheetId
        const title = sheet.properties.title
        const id = `${ title.toLowerCase().split(' ').join('-') }-${ sheetId }`
        const column = sheet.data[0].rowData.map((r) => r.values[1].formattedValue).slice(0, 20)
        try {
          return {
            id: id,
            graduate: title,
            title: column[0] ? column[0] : 'No title',
            sub: column[1] ? column[1] : 'No subtitle',
            type: column[2] ? column[2] : 'No type',
            supervision: column[3] ? column[3] : 'No supervisors',
            expertise: column[4] ? column[4] : 'No expertise',
            tags: column[5] ? column[5] : 'No tags',
            content: [
              column[6] ? column[6] : 'No content in slot 1',
              column[7] ? column[7] : 'No content in slot 2',
              column[8] ? column[8] : 'No content in slot 3',
              column[9] ? column[9] : 'No content in slot 4',
              column[10] ? column[10] : 'No content in slot 5',
              column[11] ? column[11] : 'No content in slot 6'
            ],
            picture: column[12] ? column[12] : 'https://i.imgur.com/dhEBWaQ.jpg',
            mail: column[13] ? column[13] : 'No mail',
            link: column[14] ? column[14] : 'No link',
            externals: [column[15], column[16]],
            thumbnail: column[17] ? column[17] : 'https://i.imgur.com/dhEBWaQ.jpg',
            chat: await getMessages(id)
          }
        } catch(error) {
          console.log(title, error)
          reject('Error while parsing values')
        }
      }))

      console.log(Date.now(), `Db fetched ${ values.length } projects`)

      if (randomize) {
        const distributed = await distribute(values)
        state.projects = distributed
        return resolve(distributed)
      } else {
        const projects = await Promise.all(values.map((value) => {
          const yes = state.projects.find((project) => project.id === value.id)
          value.position = yes.position
          return value
        }))
        return resolve(projects)
      }
    })
  })
}

async function getProgram () {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.get({
      spreadsheetId: state.sheets.program,
      includeGridData: true
    }, async (err, res) => {
      if (err) {
        console.log(err)
        return reject('Error while getting program')
      }
      const sheets = res.data.sheets
      const values = await Promise.all(sheets.map(async (sheet) => {
        const description = sheet.data[0].rowData[1].values[2].formattedValue
        const program = sheet.data[0].rowData.map((r) => {
          return {
            time: r.values[0].formattedValue,
            content: r.values[1].formattedValue
          }
        }).slice(1)

        return {
          program: program,
          description: description
        }
      }))
      console.log(Date.now(), `Db fetched program`)
      resolve(values[0])
    })
  })
}

/* async function getProjects (randomize) {
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
} */

async function getMessages (id) {
  const entry = await chats.findOne({ id: id })
  if (entry) {
    return entry.content
  } else {
    chats.insert({
      id: id,
      content: []
    })
    console.log('init chat', id)
    return []
  }
}

async function storeMessage (id, message) {
  const messages = await getMessages(id)
  messages.push(message)

  chats.findOneAndUpdate({ id: id }, { $set: { content: messages } })
    .then((entries) => {
      console.log('stored', id)
    })
    .catch((error) => {
      console.log('error while storing chats', id, error)
    })
}

/* function getMessages (name) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.get({
      spreadsheetId: state.sheets.database,
      range: `\'${ name }\'!B50`,
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
} */

/* async function storeMessage (name, message) {
  const messages = await getMessages(name)
  messages.push(message)

  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.update({
      spreadsheetId: state.sheets.database,
      range: `\'${ name }\'!B50`,
      valueInputOption: 'RAW',
      resource: { values: [[JSON.stringify(messages)]] },
    }, (err, res) => {
      if (err) return reject('Error while storing message', error)
      return resolve('Stored message')
    })
  })
} */

function checkSecret(name, content) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.get({
      spreadsheetId: state.sheets.database,
      range: `\'${ name }\'!B19`,
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
exports.getProgram = getProgram
exports.getMessages = getMessages
exports.storeMessage = storeMessage
exports.checkSecret = checkSecret
