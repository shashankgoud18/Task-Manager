const {createTransport} = require('nodemailer');

const sendMail = async (email,subject,text)=>{
    const transporter = createTransport ({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    })
    const message = {
        from: process.env.SMTP_USER,
        to:email,
        subject,
        text
    }
    await transporter.sendMail(message);
    
}

module.exports = sendMail;