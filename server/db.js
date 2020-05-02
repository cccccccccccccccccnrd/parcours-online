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
        resolve('Db authenticated')
      })
    })
  })
}

function getValues(graduate) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.values.get({
      spreadsheetId: state.spreadsheet,
      range: `\'${ graduate.name }\'!B1:B7`,
    }, (err, res) => {
      if (err) return reject('The API returned an error')
      const row = res.data.values.flat()

      resolve({
        id: `${ graduate.name.toLowerCase().split(' ').join('-') }-${ graduate.id }`,
        title: row[0],
        sub: row[1],
        type: row[2],
        supervision: row[3],
        expertise: row[4],
        tags: row[5],
        content: row[6]
      })
    })
  })
}

async function getGraduates () {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({ version: 'v4', auth: state.auth })
    return sheets.spreadsheets.get({
      spreadsheetId: state.spreadsheet,
    }, (err, res) => {
      if (err) return reject('The API returned an error')
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

exports.init = init
exports.getProjects = getProjects
