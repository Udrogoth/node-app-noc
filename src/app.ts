
import 'dotenv/config';
import { Server } from "./presentacion/server";
import { envs } from './config/plugins/envs.plugin';
// Funion anonima autoInvocada

(async () => {
    main();
})();

function main () {
    // Server.start();
    console.log(envs);
};



