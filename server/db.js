const fs = require('fs')
const { google } = require('googleapis')

const state = {
  spreadsheet: '14TnnmZb8hbHHzmuqGwrdWe8abgMrDXeQb0NiKi92VwE',
  auth: null
}

function init () {
  return new Promise((resolve, reject) => {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return reject('Error loading client secret file')
      const credentials = JSON.parse(content)
      const { client_secret, client_id, redirect_uris } = credentials.installed
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

      fs.readFile('token.json', (err, token) => {
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
      if (res.data.values) {
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
          content: column[6],
          chat: column[7] ? JSON.parse(column[7]) : []
        })
      } else {
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

async function getProjects () {
  const graduates = await getGraduates()
  return await Promise.all(graduates.map(async (graduate) => {
    return await getValues(graduate)
  }))
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

exports.init = init
exports.getProjects = getProjects
exports.storeMessage = storeMessage
