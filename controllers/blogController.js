const express = require('express');
const mongoose = require('mongoose');
const shortid = require('short-id')

// importing model here
const BlogModel = mongoose.model('Blog')


    let getAllBlog = (req, res) => {
        
        BlogModel.find()
            .select('-__v -_id')
            .lean()
            .exec((err, result) =>{

                if(err){

                    console.log(err);
                    res.send(err);
                    
                }else if(result == undefined || result == null || result == ''){

                    console.log('Blog not Found!!!');
                    res.send('No Blog found!');
                    
                }else{

                    res.send(result);

                }
            })

    }//get all blogs ends here


    // Function to get a single blog by Id
    let viewByBlogId = (req, res) => {

        BlogModel.findOne({ 'blogId': req.params.blogId }, (req, res) => {

            if(err){

                console.log(err);
                res.send(err);

            }else if(result == undefined || result == null || result == ''){

                console.log('Blog not Found!!!');
                res.send('No Blog found!');
                
            }else{

                res.send(result);

            }

        })

    }//end of get single blog

    let createBlog = (req, res) => {

        var today = Date.now();
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

                console.log(err);
                res.send(err);

            }else{

                res.send(result);

            }

        }) // end of save blog function

    }//end of blog create function

    // Function  to edit Blog
    let editBlog = (req, res) => {

        let options = req.body;
        
        BlogModel.update({'blogId': req.params.blogId}, options, {multi: true}).exec((err, result) => {

            if(err){

                console.log('err :', err);
                res.send(err);

            }else if(result == undefined || result == null || result == ''){

                console.log('Blog not Found!!!');
                res.send('No Blog found!');
                
            }else{

                res.send(result);

            }
        })
    }//end of edit blog

    // function to increase the blog view
    let increaseBlogView = (req , res) => {

        BlogModel.findOne({'blogId': req.params.blogId }, (err, result) => {

            if(err){

                console.log('err :', err);
                res.send(err);

            }else if (result == undefined || result == null || result == ''){

                console.log('Blog not found');
                res.send("Blog Not Found")

            }else{
                result.views += 1;
                result.save(function(err, result)  {

                    if(err){
    
                        console.log('err :', err);
                        res.send(err);
    
                    }else{
                        
                        res.send(result);
                        
                    }
                })

            }

        })

    }//end of increse count

module.exports = {

    getAllBlog: getAllBlog,
    viewByBlogId: viewByBlogId,
    createBlog: createBlog,
    editBlog: editBlog,
    increaseBlogView: increaseBlogView,

}