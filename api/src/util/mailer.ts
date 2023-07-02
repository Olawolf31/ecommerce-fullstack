import nodemailer from 'nodemailer'
import { SMTP_PASSWORD, SMTP_USERNAME } from './secrets'
import { EmailType } from '../@types/mailer'

export const sendEmailWithNodeMailer = async (emailData: EmailType) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    })

    const mailOptions = {
      from: SMTP_USERNAME, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    }

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('-------SMTP ERROR1-------')
        console.log(error)
      } else {
        console.log('Verification link sent: %s', info.response)
      }
    })
  } catch (error) {
    console.log('-------SMTP ERROR2-------', error)
  }
}
