const chalk = require('chalk').default
const morgan = require('morgan')
const fs = require('fs');
const path = require('path');
const config = require('./config'); //importing the config file to get the environment variables

//also we are using createWriteStream to create a write stream(stream is a way to read and write data in chunks) to write the logs to a file
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' }) // flag 'a' means appending

morgan.token('message', (req, res) => res.locals.errorMessage || ''); //custom token to get the error message from the response locals

const ipFormat = () => {
    return config.node_env === 'production' ? '[:remote-addr]' : '--';
}
const successFormat = `${ipFormat()} :method :url :status :response-time ms :user-agent :date`;
const successHandler = morgan(successFormat, {
    stream: accessLogStream,
    skip: (req, res) => {
        return res.statusCode >= 400; //skip the logs if the status code is less than 400
    }
})
const errorFormat = `${ipFormat()} :method :url :status :response-time ms :user-agent :date -error-message: :message`;
const errorHandler = morgan(errorFormat, {
    stream: accessLogStream,
    skip: (req, res) => {
        return res.statusCode < 400;
    }
})
const colorFormat = (tokens, req, res) => {
    return [
        chalk.gray(ipFormat()),
        chalk.blue(tokens.method(req, res)),
        chalk.yellow(tokens.url(req, res)),
        chalk.green(tokens.status(req, res)),
        chalk.cyan(tokens['response-time'](req, res) + ' ms'),
        chalk.magenta(tokens['user-agent'](req, res)),
        chalk.white(tokens.date(req, res)),
        chalk.red(tokens.message(req, res))
    ].join(' ');
}
module.exports = {
    successHandler, errorHandler
};
