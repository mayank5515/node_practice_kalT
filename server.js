//THIS WILL FILE BE CONCERNED WITH APP , MIDDLEWARES , ROUTES , ERROR HANDLING AND SECURITY
const express = require("express");
const {
  successHandler: morganSuccessHandler,
  errorHandler: morganErrorHandler,
} = require("./config/morgan");
const ApiError = require("./utils/ApiError.js");
const { blogRouter, authRouter } = require("./routes");
const { errorHandler, errorConverter } = require("./middleware/error.js");

const app = express();
app.use(express.json());
app.use(morganSuccessHandler); // Log successful requests
app.use(morganErrorHandler); // Log error requests
// app.use(morganMiddleware);

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/auth", authRouter);

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
