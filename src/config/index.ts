import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const TIME_ZONE = 'Europe/Paris';
export const LOCALE = 'fr-FR';
// auto set these values
// /!\ docker container timezone are not synced with host
// export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
// export const LOCALE = Intl.DateTimeFormat().resolvedOptions().locale;

export const {
  APP_NAME,
  APP_VERSION,
  APP_CLIENT_URL,
  NODE_ENV,
  PORT,
  PROXY_EXT_PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASS,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  AWS_ENDPOINT,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET,
  AWS_REGION,
  MAILER_HOST,
  MAILER_USER,
  MAILER_PASS,
} = process.env;
