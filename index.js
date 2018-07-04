const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const http = require('http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const globalErrorMiddleware = require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./middlewares/routeLogger');
var helmet = require('helmet');
const logger = require('./libs/loggerLib');


//declaring an instance of application
const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(helmet())
app.use(globalErrorMiddleware.globalErrorHandler);
app.use(routeLoggerMiddleware.logIp);


//Bootstrap all the models
let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function(file) {

    if (~file.indexOf('.js')) {
        

         require(modelsPath + '/' + file);

    }

}); //end of bootstraoing models


//Bootstrap all the routes
let routePath = './routes';
fs.readdirSync(routePath).forEach(function(file) {

    if (~file.indexOf('.js')) {

        let route = require(routePath + '/' + file);

        route.setRouter(app);

    }

}); //end of bootstraping routes

//calling 404 after not found routes
app.use(globalErrorMiddleware.globalNotFoundHandler);

//end of global middleware
// Note: The Order here is very important first the Models, then route and then the Middleware for route


const server = http.createServer(app);
console.log(appConfig);
server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);
//end of server listening code

//Event listener for Http server error event
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnListeningHandler', 10)
    let db = mongoose.connect(appConfig.db.uri)
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})

// handling mongoose connection error
mongoose.connection.on('error', function(err) {

        console.log("Database connection Error!");

        console.log(err);

    }) //end of connection error

// handling mongoose connection error
mongoose.connection.on('open', function(err) {

        if (err) {

            console.log("Database connection Error!");

            console.log(err);
        } else {

            console.log("Database connection Success!");

        }

    }) //end of connection error