
import 'dotenv/config';
import { Server } from "./presentacion/server";
import { LogModel, MongoDataBase } from './data/mongo';
import { envs } from './config/plugins/envs.plugin';
import { PrismaClient } from '@prisma/client';
// Funion anonima autoInvocada

(async () => {
    main();
})();

async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URl,
        dbName: envs.MONGO_DB_NAME,

    });


    //Crear una collecion = tablas, documentos =registro
    Server.start();
    // const newLog = await LogModel.create({
    //     message: 'Test Message desde Mongo',
    //     origin: 'app.ts',
    //     level: 'low',
    // })

    // await newLog.save();

    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);


    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create(
    //    {

    //         data:{
    //             level:'HIGH',
    //             message:'test message',
    //             origin: 'App.ts'
    //         }

    //     });


    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'LOW'
    //     }
    // });

    // console.log(logs);
};



