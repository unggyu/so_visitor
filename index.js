const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: false, // trun off the electron window
  waitTimeout: 180000, // 3m
})
const Mailgun = require('mailgun-js')

let mailgun
const LOGIN_PAGE = 'https://stackoverflow.com/users/login'
console.log(`Has mailgun api key? ${!!process.env.MAILGUN_API_KEY}`)
console.log(`Has mailgun domain? ${!!process.env.MAILGUN_DOMAIN}`)
console.log(`Has StackOverflow emai? ${!!process.env.SO_EMAIL}`)
console.log(`Has StackOverflow password? ${!!process.env.SO_PASSWORD}`)

if (process.env.MAILGUN_API_KEY && !!process.env.MAILGUN_DOMAIN) {
  mailgun = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  })
  if (mailgun) {
    console.log('Mailgun available.')
  }
}

if (nightmare) {
  console.log('Nightmare available.')
}

nightmare
  .goto(LOGIN_PAGE)
  .wait('#login-form')
  .type('#email', process.env.SO_EMAIL)
  .type('#password', process.env.SO_PASSWORD)
  .click('#submit-button')
  .wait('a.my-profile')
  .click('a.my-profile')
  .wait('#top-cards')
  .evaluate(() => {
    const el = document.querySelector(
      '#top-cards div.d-flex.ai-center.gs4.mb0 > span'
    )
    return el ? el.innerText : 'null'
  })
  .end()
  .then(processResult)
  .catch(processError)

function processResult(text) {
  console.log(`Visit success. (${text})`)
  if (mailgun) {
    mailgun.messages().send(
      {
        from: 'SO Visitor <no-reply@mailgun.org>',
        to: process.env.SO_EMAIL,
        subject: `Stackoverflow visiting report (${text})`,
        text: `Hi man. Thats your stat for now: ${text}`,
      },
      (error, body) => {
        if (error) {
          console.error(`An error occurred while sending mail. ${error}`)
          throw error
        } else {
          console.log('Mail has been sent.')
        }
      }
    )
  }
}

function processError(errText) {
  console.error(`Visit failure. error: ${errText}`)
  if (mailgun) {
    mailgun.messages().send(
      {
        from: 'SO Visitor <no-reply@mailgun.org>',
        to: process.env.SO_EMAIL,
        subject: `Stackoverflow visiting report (Error)`,
        text: `Something went wrong: ${errText}`,
      },
      (error, body) => {
        if (error) {
          console.error(`An error occurred while sending mail. ${error}`)
          throw error
        } else {
          console.log('Mail has been sent.')
        }
      }
    )
  }
}
