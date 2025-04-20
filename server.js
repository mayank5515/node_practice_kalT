//THIS WILL FILE BE CONCERNED WITH APP , MIDDLEWARES , ROUTES , ERROR HANDLING AND SECURITY
const express = require('express');
const ApiError = require('./utils/ApiError.js');
const blogRouter = require('./routes/blog.route');
const { errorHandler, errorConverter } = require('./middleware/error.js');

const app = express();
app.use(express.json());




app.use('/api/v1/blogs', blogRouter);

//ERROR HANDLING MIDDLEWARES
// app.all('*', (req, res, next) => {
//     next(new ApiError(HttpStatus.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`));
// })

app.use((req, res, next) => {
    next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(errorConverter); // convert error to ApiError format
app.use(errorHandler);

module.exports = app;