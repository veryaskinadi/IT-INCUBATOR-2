import {Request, Response, Router} from "express";
import {CreateBlogRequestModel} from "../models/CreateBlogRequestModel";
import {UpdateBlogRequestModel} from "../models/UpdateBlogRequestModel";
import {createBlogValidator} from "../midlewares/validation/blogValidation/validator";
import * as blogsService from "../../core/blogs/blogsService";
import {authMiddleware} from "../midlewares/auth-middleware";


export const blogsRouter = Router({})

blogsRouter.post('/', authMiddleware, createBlogValidator, async(request: CreateBlogRequestModel, response: Response) => {
    const newBlog = await blogsService.createNewBlog(request.body)
    response.status(201).send(newBlog);
})

blogsRouter.get('/', async (request: Request, response: Response) => {
    const blogs = await blogsService.getAllBlogs()
    response.status(200).send(blogs)
})

blogsRouter.get('/:id',async(request: Request<{id: string}>, response: Response) => {
    const blog = await blogsService.getBlogId(request.params.id)
    if(blog) {
        response.status(200).send(blog)
   } else {
       response.sendStatus(404)
   }
})

blogsRouter.delete('/:id', authMiddleware, async(request: Request<{id: string}>, response: Response) => {
    const blog = await blogsService.getBlogId(request.params.id)
    if(!blog) {
        response.sendStatus(404)
    }
    await blogsService.deleteBlog(request.params.id)
    response.sendStatus(200)
})

blogsRouter.put('/:id', authMiddleware, createBlogValidator, async (request: UpdateBlogRequestModel, response: Response) => {
    const blog = await blogsService.getBlogId(request.params.id)
    if(!blog) {
        response.sendStatus(404)
    }
      await blogsService.updateBlog(request.params.id, request.body)
      response.sendStatus(204);
 })