import { LogRepositoryImpl } from '../infrastructure/repository/log-imp.repository';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { SendEmailLogs } from '../domain/use-cases/email/send-emal-logs';
import { EmailService } from './email/email.service';
import { CronServices } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/ckecks/ckeack-service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log-datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgressLogDatasource } from '../infrastructure/datasources/postgres-log-datasource';
import { CheckServiceMultiple } from '../domain/use-cases/ckecks/ckeack-service-multiple';


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgressLogDatasource(),
);

export class Server {


    public static async start() {

        console.log('Server Running...');

        // const emailService = new EmailService();
        // //Mandar email


        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,

        // ).execute(['juegosenlinea94@gmail.com'])

        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(
        //     ['juegosenlinea94@gmail.com']
        // );

        // const  log = await logRepository.getLog(LogSeverityLevel.low);
        // console.log(log);
        // CronServices.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https:google.com';
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error),
        //         ).execute(url)
        //     }
        // );

    }

}