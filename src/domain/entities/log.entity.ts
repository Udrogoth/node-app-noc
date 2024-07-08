
export enum LogSeverityLevel {
    low = 'low',
    mediun = 'medium',
    high = 'high',
}


export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.message = message;
        this.level = level;
        this.createAt = new Date();
    }



    static fronJson = (json: string): LogEntity => {
        const { message, level, createAt } = JSON.parse(json);
        if (!message) throw new Error('Message no require')

        const log = new LogEntity(message, level);
        log.createAt = new Date(createAt);
        return log;
    }
}

