const winston = require('winston');
const { format, createLogger } = require('winston');
const config = require('./config');
const { combine, timestamp, printf } = format;

const loggingFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}:  ${stack ? stack : message}`;
})
const logger = createLogger({
    level: config.node_env === 'development' ? 'debug' : 'info', // max level of logging
    format: combine(
        config.node_env === 'development' ? format.colorize() : format.uncolorize(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        loggingFormat
    ),
    transports: [new winston.transports.Console()],
})

module.exports = logger;

//log levels
// error: 0

// warn: 1

// info: 2

// http: 3

// verbose: 4

// debug: 5

// silly: 6