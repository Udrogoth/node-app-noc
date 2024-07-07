import { CronJob } from "cron";

type CronTime = string | Date;
type Ontick = () => void;
interface cron {
    CronTime: string | Date;
    Ontick: () => void;
}
export class CronServices {


    static createJob(cronTime: CronTime, onTick: Ontick): CronJob {

        const job = new CronJob(cronTime, onTick);

        job.start();

        return job;
    }

}