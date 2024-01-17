const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const mailFunction = {

    pathDB: path.join(__dirname, "../data/mailDataBase.json"),

    getMail: function()  {
        let mailDB = [];
        let readMail = fs.readFileSync(this.pathDB, 'utf-8');
        if (readMail != ""){
            mailDB = JSON.parse(readMail);
        };
        return mailDB[0];
    },

    mail:   function(){
        let data = this.getMail();
        return data.mail
    },

    pass:   function(){
        let data = this.getMail();
        return data.pass
    },

    store: function(data){
        fs.writeFileSync( this.pathDB, JSON.stringify(data, null, ' ') );
        return true
    },

    editMailData:   function(data){
        let mail = this.getMail();
        let mailNewData = [];
        data.mail ? mail.mail = data.mail : mail.mail = mail.mail;
        data.pass ? mail.pass = data.pass : mail.pass = mail.pass;
        mailNewData.push(mail);
        this.store(mailNewData);
        return mail
    },

    send: async function(to, subject, text){
        const mail = "guilleac81@gmail.com";
        const config = {
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: this.mail(),
                pass: this.pass(),
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
        const info = await transporter.sendMail(mensaje,(error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).send({ message: "Mail send", message_id: info.messageId });
        });
        return info
    },
    
    mailData: function(user, sale){
        const to = user.email;
        const subject = `Compra realizada el usuario ${user.username}, el dia ${sale.day}/${sale.month}/${sale.year}, en MultiHogar  `;
        const headerMessage = `El día ${sale.day}/${sale.month}/${sale.year}, el usuario ${user.name} ha realizado una compra en Multihogar por el monto de $${sale.amount}.\n Detalle de la compra: \n`;
        const products = sale.products;
        let detail = "\n";
        for (const product of products) {
            detail = detail + `- ${product.quantity} ${product.name}: $${product.finalPrice}.  Valor total:${product.amount} \n`
        };
        return {
            to,
            subject,
            headerMessage,
            detail
        }
    }
} 

module.exports = mailFunction
