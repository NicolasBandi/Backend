import nodemailer from 'nodemailer'

import logger from './logger.js'

const email = process.env.NODEMAILER_MAIL_TARGET;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lorine.krajcik42@ethereal.email',
        pass: 'EARvdQNFUxACANcwWc'
    },
})

export default async function sendMail(subject, body) {
    const opts = {
        from: 'Backend Pre entrega final 3',
        to: email,
        subject,
        html: body
    }
    
    try {
        const result = await transporter.sendMail(opts);
        logger.info('Mail sended', result);
    } catch (error) {
        logger.error('Mail cannot send', error);
    }

}
