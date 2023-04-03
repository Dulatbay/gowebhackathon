const nodeMailer = require('nodemailer');
const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");
require('dotenv').config()
class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        try {

            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: to,
                subject:  'Activate account',
                text: 'Hi, please activate your account!',
                html:
                    `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
        }catch (e){
            await UserModel.deleteOne({email: to});
            throw  ApiError.BadRequest(`Почта не существует, укажите корректные данные`);
        }

    }
}
module.exports = new MailService()
