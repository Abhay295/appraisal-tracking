const mailer = require("nodemailer")

const sendingMail = async (to,subject,text)=>{
    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"abhayhingu9.11.2003@gmail.com",
            pass:"njwt mvzr utqk eire"
        },
    })

    const mailOptions= {
        from:"abhayhingu9.11.2003@gmail.com",
        to:to,
        subject:subject,
        html:text,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(mailResponse);
    return mailResponse
    
}


module.exports = { sendingMail}
