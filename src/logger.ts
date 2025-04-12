import {createLogger, format, transports} from 'winston';
const {combine, timestamp, printf, colorize, errors} = format;

// Custom log format
const logFormat = printf(({level, message, timestamp, stack}) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    errors({stack: true}),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
    new transports.File({filename: 'logs/info.log', level: 'info'}),
    new transports.File({filename: 'logs/warn.log', level: 'warn'}),
    new transports.File({filename: 'logs/error.log', level: 'error'}),
  ],
  exceptionHandlers: [new transports.File({filename: 'logs/exceptions.log'})],
  rejectionHandlers: [new transports.File({filename: 'logs/rejections.log'})],
});

export default logger;
