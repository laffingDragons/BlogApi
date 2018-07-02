let errorHandler = (err, req, res, next) => {

    console.log("application error handler called");
    console.log(err);
    res.send(err);

}//end of request ip logger function

let notFoundHandler = (req, res, next) => {

    console.log("Gobal not found handler error");
    res.status(404).send('Route not Found in the application');

}// end of found handler

module.exports = {

    globalErrorHandler: errorHandler,
    globalNotFoundHandler: notFoundHandler

}