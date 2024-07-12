import fs from 'fs'
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource {

    // estas son argumentos 
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor(

    ) { this.createLogs(); }


    // function create logs
    private createLogs = () => {
        //that not exit path to create
        if (!fs.existsSync(this.logPath)) {
            //to create dir
            fs.mkdirSync(this.logPath);
        }

        // array
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,

            // running to array
        ].forEach(path => {
            // if exist 
            if (fs.existsSync(path)) return;
            // write in the path
            fs.writeFileSync(path, '')
        });
    }

    //metode    // newLog is Parameter/ LogEntity is type 
    // Promise<void> refers is a Promise to not return
    async saveLog(newLog: LogEntity): Promise<void> {
        //transform in to JSON file
        const logAsJson = `${JSON.stringify(newLog)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);

        if (newLog.level === LogSeverityLevel.low) return;
        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }

    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');

        if (content === '') return [];
        const logs = content.split('\n').map(
            log => LogEntity.fronJson(log)
        );
        return logs;
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implement`)
        }
    }

}
