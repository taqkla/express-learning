import express from 'express';
const router = express.Router();

import BlogController from '../controllers/blogcontrollers';

router.post(`/createBlog`, async(res, req) => {
    try {
        let {body} = req;
        if(!body || Object.keys(body).length<=0){
            res.status(400).send({error: true, msg: "Mandatory params are missing"});
            console.log(`Mandatory params are missing - body`,req,res);
            return;
        }
        let data = await BlogController.addNewBlog(body);
        res.status(data.status).send(data);
        console.log(data?.msg || "Successfully fetched project details",req,res);
    } catch (error) {
        res.status(data.status).send(data);
        console.log(`Error while saving new blog`,req,res,error);
    }
})

router.patch(`/updateBlog`, async(res, req) => {
    try {
        let {body} = req;
        if(!body || Object.keys(body).length<=0){
            res.status(400).send({error: true, msg: "Mandatory params are missing"});
            console.log(`Mandatory params are missing - body`,req,res);
            return;
        }
        let data = await BlogController.updateBlog(body);
        res.status(data.status).send(data);
        console.log(data?.msg || "Successfully fetched project details",req,res);
    } catch (error) {
        res.status(data.status).send(data);
        console.log(`Error while updating blog`,req,res,error);
    }
})

router.get(`/getBlogs/:author_id/page/:pageId/limit/:limitNo`, async(res,req) => {
    try {
        let {author_id,pageId,limitNo} = req.params;
        if(!author_id){
            res.status(400).send({error: true, msg: "Mandatory params are missing"});
            LoggerHelper.errorLog(`Mandatory params are missing`,req,res);
            return;
        }
        let data = await BlogController.getBlogsForAuthor(author_id,pageId,limitNo);
        res.status(data.status).send(data);
        console.log(data?.msg || "Successfully fetched blogs for author",req,res);
    } catch (error) {
        res.status(data.status).send(data);
        console.log(`Error while fetching blogs for author`,req,res,error);
    }
})

router.get(`/getBlogs/:author_id/:blog_id`, async(res,req) => {
    try {
        let {author_id,blog_id} = req.params;
        if(!author_id || !blog_id){
            res.status(400).send({error: true, msg: "Mandatory params are missing"});
            LoggerHelper.errorLog(`Mandatory params are missing`,req,res);
            return;
        }
        let data = await BlogController.getBlogForAuthor(author_id,blog_id);
        res.status(data.status).send(data);
        console.log(data?.msg || "Successfully fetched blog for author",req,res);
    } catch (error) {
        res.status(data.status).send(data);
        console.log(`Error while fetching blog for author`,req,res,error);
    }
})

router.get(`/deleteBlog/:author_id/:blog_id`, async(res,req) => {
    try {
        let {author_id,blog_id} = req.params;
        if(!author_id || !blog_id){
            res.status(400).send({error: true, msg: "Mandatory params are missing"});
            LoggerHelper.errorLog(`Mandatory params are missing`,req,res);
            return;
        }
        let data = await BlogController.deleteBlogForAuthor(author_id,blog_id);
        res.status(data.status).send(data);
        console.log(data?.msg || "Successfully deleted blog for author",req,res);
    } catch (error) {
        res.status(data.status).send(data);
        console.log(`Error while deleting blog for author`,req,res,error);
    }
})