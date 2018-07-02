const express = require('express');
const blogController = require('./../controllers/blogController')
const apiConfig = require('./../config/appConfig')

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion+'/blogs';

       app.get(baseUrl+'/all', blogController.getAllBlog);

       app.get(baseUrl+'/view/:blogId', blogController.viewByBlogId);

       app.post(baseUrl+'/create', blogController.createBlog);

    } // end of setROuter function

module.exports = {

    setRouter: setRouter
}