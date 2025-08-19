//THIS WILL BE THE ENTRY POINT OF THE APPLICATION , & WILL BE CONCERNED WITH
//CONNECTING TO THE DATABASE AND STARTING THE SERVER & HANDLING UNCAUGHT EXCEPTIONS
// const db = require('./model/index.js');
const config = require('./config/config.js');
const http = require('http');
const logger = require('./config/logger.js');
const app = require('./server.js');
const mongoose = require('mongoose')



const httpServer = http.createServer(app); //useful when using socket.io
let server = null;
(async () => {
    try {
        // await db.sequelize.sync();
        const mongodb_uri = config.mongodb_uri.replace('<PASSWORD>', config.mongodb_password);
        const something = await mongoose.connect(mongodb_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('Database connection established successfully.');
        server = httpServer.listen(config.port, (err) => {
            logger.info(`Server is running on port ${config.port}`);
        });
    }
    catch (err) {
        logger.error(`Error connecting to the database: ${err}`);
    }
})();

process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception thrown: ${err.message}`);
    server.close(() => {
        logger.error('Server closed due to uncaught exception');
        process.exit(1);
    })
})

process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection at: ${err.stack || err}   message: ${err.message}`);

    server.close(() => {
        logger.info('Server closed due to unhandled rejection');
        process.exit(1);
    })
})
process.on('SIGTERM', () => {
    logger.info('SIGTERM received: closing HTTP server');
    if (server) {
        server.close(() => {
            logger.info('HTTP server closed');
        });
    }
})





