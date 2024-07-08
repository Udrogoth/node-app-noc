import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../reporitoty/log.repository";

interface CkeackServiceUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CkeackServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) { }


    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on ckeack service ${url}`);
            }
            const log = new LogEntity(`service ${url} working`, LogSeverityLevel.low);
            this.logRepository.saveLog(log)
            this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`;
            const log = new LogEntity(`${errorMessage}`, LogSeverityLevel.high);
            this.logRepository.saveLog(log);

            this.errorCallback(`${errorMessage}`);
            return false;
        }


    }

}