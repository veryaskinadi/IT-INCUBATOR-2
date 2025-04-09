import {Request, Response, Router} from "express";
import {CreateBlogRequestModel} from "../models/CreateBlogRequestModel";
import {blogs} from "../../store/db"
import {UpdateBlogRequestModel} from "../models/UpdateBlogRequestModel";

export const blogsRouter = Router({})

blogsRouter.post('/', (request: CreateBlogRequestModel, response: Response) => {
   const newBlog = {
       id: new Date().getTime().toString(),
       name: request.body.name,
       description: request.body.description,
       websiteUrl: request.body.websiteUrl
       }

   blogs.push(newBlog)
   response.status(201).send(newBlog);
})

blogsRouter.get('/', (request: Request, response: Response) => {
   response.status(200).send(blogs)
})

blogsRouter.get('/:id',(request: Request<{id: string}>, response: Response) => {
   const blog = blogs.find(b => b.id === request.params.id)
   if(blog) {
     response.status(200).send(blog)
   } else {
       response.sendStatus(404)
   }
})

blogsRouter.delete('/:id',(request: Request<{id: string}>, response: Response) => {
   const blogIndex = blogs.findIndex(b => b.id === request.params.id)
   if(blogIndex === -1) {
     response.sendStatus(404)
     return
   }
   blogs.splice(blogIndex, 1)
   response.sendStatus(204)
})

blogsRouter.put('/:id', (request: UpdateBlogRequestModel, response: Response) => {
     let blog = blogs.find(b => b.id === request.params.id)
     if (!blog) {
         response.sendStatus(404);
         return
     }

     blog = Object.assign(blog, request.body)
      response.sendStatus(204);
 });