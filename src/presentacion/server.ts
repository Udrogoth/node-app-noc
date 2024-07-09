import { LogRepositoryImpl } from '../infrastructure/repository/log-imp.repository';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { SendEmailLogs } from '../domain/use-cases/email/send-emal-logs';
import { EmailService } from './email/email.service';


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);


export class Server {


    public static start() {

        console.log('Server Running...');

        const emailService = new EmailService();
        //Mandar email


        new SendEmailLogs(
            emailService,
            fileSystemLogRepository,

        ).execute(['juegosenlinea94@gmail.com'])

        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(
        //     ['juegosenlinea94@gmail.com']
        // );
           
        // CronServices.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //        const url = 'https:google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             ()=>console.log(`${url} is ok`),
        //             (error)=>console.log(error),
        //         ).execute(url)    
        //     }
        // );

    }

}