import sendgrid from "@sendgrid/mail"
import server_config from "../config/server_config"

export default class MailerService {

    constructor() {
        sendgrid.setApiKey(server_config.SENDGRID_API_KEY)
    }

    async sendEmail (to:string, subject: string, body: string) {
        const email = {
            to: to,
            from: server_config.MAIL_FROM || "",
            subject: subject,
            text: body,
            html: body,
        }

        try {
            const response = await sendgrid.send(email);  
            console.log(response);
            return {
                message: 'MAIL SENT SUCCESSFULLY',
                success: true
            }  
        } catch(error) {
            console.log(error);
            return {
                success: false
            }
        }
    }
}