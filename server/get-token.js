const path = require('path')
const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

fs.readFile(path.join(__dirname, 'credentials.json'), (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  authorize(JSON.parse(content))
})

function authorize (credentials) {
  console.log(credentials)
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  getNewToken(oAuth2Client)
}

function getNewToken (oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err)
      oAuth2Client.setCredentials(token)

      fs.writeFile(path.join(__dirname, 'token.json'), JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored')
      })
    })
  })
}