import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createLogger, format, transports } from 'winston';
import { LOCALE, LOG_DIR, TIME_ZONE } from '@config';
import winstonDaily from 'winston-daily-rotate-file';
import { isEmpty } from '@utils/util';

// logs dir
const logDir: string = join(__dirname, LOG_DIR);
// console.log(logDir);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const timeZoned = () => {
  return new Date().toLocaleString(LOCALE, {
    timeZone: TIME_ZONE,
  });
};
// Define log format
const logFormat = format.printf(({ timestamp, level, metadata, /* label,*/ message }) => {
  let out = `${timestamp} : ${level} : ${message}`;
  if (!isEmpty(metadata)) {
    out += ` : ${JSON.stringify(metadata)}`;
  }
  return out;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = createLogger({
  format: format.combine(
    // format.label({ label: 'main' }),
    format.metadata(),
    format.timestamp({ format: timeZoned }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug', // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error', // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new transports.Console({
    format: format.combine(format.splat(), format.colorize()),
  }),
);
/*
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}
*/
const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };
