import { CronServices } from './cron/cron-service'
import { CheckService } from '../domain/use-cases/ckecks/ckeack-service'
import { error } from 'console';
export class Server {


    public static start() {

        console.log('Server Running...');

        CronServices.createJob(
            '*/5 * * * * *',
            ()=>{
               const url = 'https://google.com';
                new CheckService(
                    ()=>console.log(`${url} is ok`),
                    (error)=>console.log(error),
                ).execute(url)    
            }
        );

    }

}