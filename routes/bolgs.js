const express = require('express');
const blogController = require('./../controllers/blogController');
const apiConfig = require('./../config/appConfig');
const auth = require('./../middlewares/auth')

let setRouter = (app) => {

    let baseUrl = apiConfig.apiVersion+'/blogs';

       app.get(baseUrl+'/all', auth.isAuthenticated, blogController.getAllBlog);

       /**
	 * @api {get} /api/v1/blogs/all Get all blogs
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)viz authToken=Admin
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Blog Details Found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */

       app.get(baseUrl+'/view/:blogId', auth.isAuthenticated, blogController.viewByBlogId);
       /**
	 * @api {get} /api/v1/blogs/view/:blogId  Get blog by Id
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)viz authToken=Admin
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Details Found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */

       app.post(baseUrl+'/create', auth.isAuthenticated, blogController.createBlog);

        /**
	 * @api {post} /api/v1/blogs/create Create blog
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)viz authToken=Admin
	 * @apiParam {String} title title of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} blogBody blogBody of the blog passed as a body parameter
	 * @apiParam {String} category category of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Created successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

       app.post(baseUrl+'/:blogId/delete',auth.isAuthenticated, blogController.deleteBlog);

        /**
	 * @api {post} /api/v1/blogs/:blogId/delete Delete blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)viz authToken=Admin
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

       app.put(baseUrl+'/:blogId/edit', auth.isAuthenticated, blogController.editBlog);

        /**
	 * @api {put} /api/v1/blogs/:blogId/edit Edit blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)viz authToken=Admin
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


       app.get(baseUrl+'/:blogId/count/view',auth.isAuthenticated, blogController.increaseBlogView);
       
        /**
	 * @api {get} /api/v1/blogs/:blogId/count/view Increase Blogs Count
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)viz authToken=Admin
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    

    } // end of setROuter function

module.exports = {

    setRouter: setRouter

}