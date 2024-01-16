const nodemailer = require('nodemailer');
/* const mail = 'guilleac81@gmail.com';
const to = "wtfgac@gmail.com";
const subject = "Mail de prueba"
const text  = "Esto es otro mail de prueba que te mando desde la PC" */

const sendMail = async(mail, to, subject, text) => {
    const config = {
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: mail,
            pass: 'ekqc grzl vqbu rrhw',
        },
        secure: true,
    };

    const mensaje = {
        from: mail,
        to: to,
        subject: subject,
        text: text,
        // o se envía texto o se envía html
        /* html: '<h1><b>Mensaje de prueba </b></h1><br> Viendo si funciona la app <br/>', */
    };

    const transporter = nodemailer.createTransport(config);
    const info = await transporter.sendMail(mensaje);
    return info
}

module.exports = sendMail
