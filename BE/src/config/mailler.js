
const nodemailer = require('nodemailer');

let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'lekhahieutamkhiem@gmail.com',
                pass: 'rwkk gnlf koor bihj'
            }
        }
    );


export default mailTransporter;