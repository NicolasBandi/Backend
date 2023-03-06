import nodemailer from 'nodemailer'

import logger from './logger.js'

const email = process.env.NODEMAILER_TRANSPORT_MAIL;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_TRANSPORT_MAIL,
        pass: process.env.NODEMAILER_TRANSPORT_PASS
    }
});

export default async function sendMail(to, subject, body) {
    const opts = {
        from: 'Nicolas Pedicino',
        to: to,
        subject, 
        html: `<h1> Nueva Orden </h1>
                <p> ${body.map((element) => element.nombre + ' ' + 'x' + ' ' + element.cantidad + ' ' + '$' + (element.precio * element.cantidad).toFixed(2)).join("</p><p>")} </p>
                <br>
                <p> Gracias por tu compra </p>
                <p> Backend 32125 </p>
            `
    }
    
    try {
        const result = await transporter.sendMail(opts);
        logger.info('Mail sended', result);
    } catch (error) {
        logger.error('Mail cannot send', error);
    }

}
