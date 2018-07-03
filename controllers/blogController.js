const express = require('express');
const mongoose = require('mongoose');
const shortid = require('short-id');
const response = require('./../libs/responseLib');
const moment = require('./../libs/timLib');
const check = require('./../libs/checkLib');
const logger = require('./../libs/loggerLib');


// importing model here
const BlogModel = mongoose.model('Blog')


    let getAllBlog = (req, res) => {
        
        BlogModel.find()
            .select('-__v -_id')
            .lean()
            .exec((err, result) =>{

                if(err){

                    logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                    let apiResponse = response.generate(true, "Error Occured", 500, null);
                    res.send(apiResponse);
                    
                }else if(check.isEmpty(result)){

                    logger.info('Blog not found', 'BlogController: getAllBlogs', 5);
                    let apiResponse = response.generate(true, "Blog Not Found", 404, null);
                    res.send(apiResponse);
                    
                }else{

                    logger.info('Blog found Successfully', 'BlogController: getAllBlogs', 5);
                    let apiResponse = response.generate(false, "Blog found Successfully", 200, result);
                    res.send(apiResponse);

                }
            })

    }//get all blogs ends here


    // Function to get a single blog by Id
    let viewByBlogId = (req, res) => {

        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

            if(err){

                    logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                    let apiResponse = response.generate(true, "Error Occured", 500, null);
                    res.send(apiResponse);

            }else if(check.isEmpty(result)){

                logger.info('Blog not found', 'BlogController: viewByBlogId', 5);
                let apiResponse = response.generate(true, "Blog Not Found", 404, null);
                res.send(apiResponse);
                
            }else{

                logger.info('Blog found Successfully', 'BlogController: viewByBlogId', 5);
                let apiResponse = response.generate(false, "Blog found", 200, result);
                res.send(apiResponse);

            }

        })

    }//end of get single blog

    let createBlog = (req, res) => {

        var today = moment.now();
        let blogId = shortid.generate();
       
        let newBlog = new BlogModel({

            blogId : blogId,
            title : req.body.title,
            description : req.body.description,
            bodyHtml : req.body.blogBody,
            isPublished : true,
            category : req.body.category,
            author : req.body.fullName,
            created : today,
            lastModifies : today

        })// end of new blog

        let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
        newBlog.tags = tags;

        newBlog.save((err, result) => {

            if(err){

                logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, "Error Occured", 500, null);
                res.send(apiResponse);

            }else{

                logger.info('Blog found Successfully', 'BlogController: createBlogId', 5);
                let apiResponse = response.generate(false, "Blog Created successfully!", 200, result);
                res.send(apiResponse);

            }

        }) // end of save blog function

    }//end of blog create function

    // Function  to edit Blog
    let editBlog = (req, res) => {

        let options = req.body;
        
        BlogModel.update({'blogId': req.params.blogId}, options, {multi: true}).exec((err, result) => {

            if(err){

                logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, "Error Occured", 500, null);
                res.send(apiResponse);

            }else if(check.isEmpty(result)){

                logger.info('Blog not found', 'BlogController: editBlog', 5);
                let apiResponse = response.generate(true, "Blog Not Found", 404, null);
                res.send(apiResponse);
                
            }else{

                logger.info('Blog found Successfully', 'BlogController: editBlog', 5);
                let apiResponse = response.generate(false, "Blog updated successfully" , 200, result);
                res.send(apiResponse);

            }
        })
    }//end of edit blog

    // function to increase the blog view
    let increaseBlogView = (req , res) => {

        BlogModel.findOne({'blogId': req.params.blogId }, (err, result) => {

            if(err){

                logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, "Error Occured", 500, null);
                res.send(apiResponse);

            }else if (check.isEmpty(result)){

                logger.info('Blog not found', 'BlogController: increaseBlogView', 5);
                let apiResponse = response.generate(true, "Blog Not Found", 404, null);
                res.send(apiResponse);

            }else{

                result.views += 1;
                result.save(function(err, result)  {

                    if(err){
    
                        logger.error(`Error Ocurred: ${err}`, 'Database', 10);
                        let apiResponse = response.generate(true, "Error Occured", 500, null);
                        res.send(apiResponse);
    
                    }else{

                        logger.info('Blog found Successfully', 'BlogController: increaseBlogView', 5);
                        let apiResponse = response.generate(false, "Blog updated successfully" , 200, result);
                        res.send(apiResponse);
                        
                    }
                })

            }

        })

    }//end of increse count

    /**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {

            logger.error(`Error Ocurred: ${err}`, 'Database', 10);
            let apiResponse = response.generate(true, "Error Occured", 500, null);
            res.send(apiResponse);

        } else if (check.isEmpty(result)) {

            logger.info('Blog not found', 'BlogController: deleteBlog', 5);
            let apiResponse = response.generate(true, "Blog Not Found", 404, null);
            res.send(apiResponse);

        } else {

            logger.info('Blog found Successfully', 'BlogController: deleteBlog', 5);
            let apiResponse = response.generate(false, "Blog Deleted successfully" , 200, result);
            res.send(apiResponse);

        }
    })
}


module.exports = {

    getAllBlog: getAllBlog,
    viewByBlogId: viewByBlogId,
    createBlog: createBlog,
    editBlog: editBlog,
    increaseBlogView: increaseBlogView,
    deleteBlog: deleteBlog

}