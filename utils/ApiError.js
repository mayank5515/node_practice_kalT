class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        if (stack) {
            this.stack = stack;
        }
        else {
            //first argument is Creates a .stack property on targetObject, which when accessed returns a string representing 
            ////the location in the code at which Error.captureStackTrace() was called.
            //second argument is start of stack trace position
            Error.captureStackTrace(this, this.constructor);
        }
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}
module.exports = ApiError;