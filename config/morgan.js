const chalk = require('chalk').default
const morgan = require('morgan')
const fs = require('fs');
const path = require('path');
const config = require('./config'); //importing the config file to get the environment variables

//also we are using createWriteStream to create a write stream(stream is a way to read and write data in chunks) to write the logs to a file
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' }) // flag 'a' means appending
const ipFormat = () => {
    return config.node_env === 'production' ? '[:remote-addr]' : '--';
}
const format = `${ipFormat()} :method :url :status :response-time ms :user-agent :date` //this is the format of the log (when it is written to the file);
const colorFormat = (tokens, req, res) => {
    return [
        chalk.gray(ipFormat()),
        chalk.blue(tokens.method(req, res)),
        chalk.yellow(tokens.url(req, res)),
        chalk.green(tokens.status(req, res)),
        chalk.cyan(tokens['response-time'](req, res) + ' ms'),
        chalk.magenta(tokens['user-agent'](req, res)),
        chalk.white(tokens.date(req, res))
    ].join(' ');
}
module.exports = [
    morgan(colorFormat),
    morgan(format, {
        stream: accessLogStream,
    })]
