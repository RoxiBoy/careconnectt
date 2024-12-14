require('dotenv').config()
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})

const from = 'CareConnect'

async function sendSMS(to, text) {
  await vonage.sms.send({to, from, text})
    .then(response => { console.log('Message sent successfully', response)})
    .catch(err => { console.log('Error sending message')})
}

module.exports = {
  sendSMS
}
