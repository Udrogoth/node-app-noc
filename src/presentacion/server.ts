import { CronServices } from './cron/cron-service'
import { CheckService } from '../domain/use-cases/ckecks/ckeack-service'
import { LogRepositoryImpl } from '../infrastructure/repository/log-imp.repository';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);


export class Server {


    public static start() {

        console.log('Server Running...');

        CronServices.createJob(
            '*/5 * * * * *',
            ()=>{
               const url = 'https:google.com';
                new CheckService(
                    fileSystemLogRepository,
                    ()=>console.log(`${url} is ok`),
                    (error)=>console.log(error),
                ).execute(url)    
            }
        );

    }

}