import { DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PASS } from './';

export const dbConnection = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
