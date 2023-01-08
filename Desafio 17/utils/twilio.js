import twilio from "twilio";

import logger from './logger.js'

export default async function sendWhatsapp(message, target) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    
    const opts = { 
        body: message,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${target}` 
    }

    client.messages
      .create(opts)
      .then(message => logger.info(message.sid))
      .catch(console.error)
}