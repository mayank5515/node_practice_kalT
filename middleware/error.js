const config = require('../config/config.js')
module.exports = (err, req, res, next) => {
    const response = {
        error: true,
        message: err.message || 'Something went wrong',
        statusCode: err.status || 500,
        ...(config.node_env === 'development' && { stack: err.stack })
    }

    if (config.node_env === 'development') {
        console.log(err);
    }
    res.status(response.statusCode).json(response)
}