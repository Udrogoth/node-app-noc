
interface CkeackServiceUseCase {
    execute(url: string): Promise<boolean>;
}


type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CkeackServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) { }


    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on ckeack service ${url}`);
            }
            this.successCallback();
            return true;
        } catch (error) {
            console.log(`${error}`);


            this.errorCallback(`${error}`);
            return false;
        }


    }

}