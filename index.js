import dotenv from 'dotenv';
import { initServer } from './configs/app.js';
import { initServerUser } from '../server-user/configs/app.js';

dotenv.config();

process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

console.log('Iniciando servidor de Kafetery...');
initServer();
initServerUser();