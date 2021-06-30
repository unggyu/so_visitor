const Nightmare = require('nightmare');
const Mailgun = require('mailgun-js');
require('dotenv').config();

const nightmare = Nightmare({ show: false });

let mailgun = null;
if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
  mailgun = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
}

const LOGIN_PAGE = 'https://stackoverflow.com/users/login';

function processResult(text) {
  if (mailgun) {
    mailgun
      .messages()
      .send({
        from: 'SO Visitor <no-reply@mailgun.org>',
        to: process.env.EMAIL,
        subject: `Stackoverflow visiting report (${text})`,
        text: `Hi man. Thats your stat for now: ${text}`
      }, (error, body) => {
        if (error) {
          throw error;
        }
    });
  }
}

function processError(errText) {
  if (mailgun) {
    mailgun
      .messages()
      .send({
        from: 'SO Visitor <no-reply@mailgun.org>',
        to: process.env.EMAIL,
        subject: `Stackoverflow visiting report (Error)`,
        text: `Something went wrong: ${errText}`
      }, (error, body) => {
        if (error) {
          throw error;
        }
    });
  }
}

nightmare
  .goto(LOGIN_PAGE)
  .wait('#login-form')
  .type('#email', process.env.EMAIL)
  .type('#password', process.env.PASSWORD)
  .click('#submit-button')
  .wait('a.my-profile')
  .click('a.my-profile')
  .wait('#top-cards')
  .evaluate(() => {
    const el = document.querySelector('#top-cards .js-highlight-box-badges span.fs-caption.grid--cell');
    return el ? el.innerText : 'null';
  })
  .end()
  .then(progressText => {
    processResult(progressText);
  })
  .catch(function (error) {
    processError(error);
  });
