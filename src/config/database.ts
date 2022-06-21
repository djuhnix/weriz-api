import { DB_DATABASE, DB_HOST, DB_PORT } from './';

export const dbConnection = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
