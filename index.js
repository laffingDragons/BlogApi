const express = require('express');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

//moddleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


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





app.listen(appConfig.port, () => {

        console.log('Magic happens on port 3000!')

        let db = mongoose.connect(appConfig.db.uri);

    }

)

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