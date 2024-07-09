import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface sendEmailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[];
}


interface Attachment {
    filename: string,
    path: string,
}

export class EmailService {
    
    private transport = nodemailer.createTransport(
        {
            service: envs.MAILER_SERVICE,
            auth: {
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_SECRET_KEY
            }
        });

    //metodo antiguo
    // private readonly logRepository;

    // constructor(logRepository: LogRepository) {
    //     this.logRepository = logRepository;
    // }

    //metodo actual
    constructor(
    ){

    }


    async sendEmail(options: sendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sendInforation = await this.transport.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachments
            })


            console.log(sendInforation);
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email send',
                origin: 'email.service.ts'
            });

       

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email  not send',
                origin: 'email.service.ts'
            });


            return false;
        }

    }


    async sendEmailWithFileSystemLogs(to: string | string[]) {

        const subject = 'Logs del servidor'
        const htmlBody = `
        <h3>Logs System</h3>
        <p>see adjunt</p>
        `

        const attachments: Attachment[] = [
            {
                filename: 'logs-low.log',
                path: './logs/logs-low.log',
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log',
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log',
            }
        ];

        this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments,

        });
    }

}