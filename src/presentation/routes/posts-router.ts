import {Request, Response, Router} from "express";
import {blogs, posts} from "../../store/db"
import {CreatePostRequestModel} from "../models/CreatePostRequestModel";
import {CreatePostForClientModel} from "../models/CreatePostForClientModel";
import {blogsRouter} from "./blogs-router";
import {UpdatePostRequestModel} from "../models/UpdatePostRequestModel";
import {createPostValidator} from "../midlewares/validation/postValidation/validator";

export const postsRouter = Router({})

postsRouter.post('/', createPostValidator, (request: CreatePostRequestModel, response: Response) => {
    const newPost = {
        id: new Date().getTime().toString(),
        ...request.body,
    }
    posts.push(newPost)

    const blog = blogs.find(b => b.id === newPost.blogId)
    if (!blog) {
        response.sendStatus(400)
        return
    }

    const PostForClient: CreatePostForClientModel = {
        ...newPost,
        blogName: blog.name,
    }
    response.status(201).send(PostForClient);
})

postsRouter.get('/', (request: Request, response: Response) => {
    response.status(200).send(posts)
})

postsRouter.get('/:id',(request: Request<{id: string}>, response: Response) => {
    const post = posts.find(p => p.id === request.params.id)
    if(post) {
        response.status(200).send(post)
    } else {
        response.sendStatus(404)
    }
})

postsRouter.delete('/:id',(request: Request<{id: string}>, response: Response) => {
    const postIndex = posts.findIndex(p => p.id === request.params.id)
    if(postIndex === -1) {
        response.sendStatus(404)
        return
    }
    posts.splice(postIndex, 1)
    response.sendStatus(204)
})

postsRouter.put('/:id', (request: UpdatePostRequestModel, response: Response) => {
    let post = posts.find(p => p.id === request.params.id)
    if (!post) {
        response.sendStatus(404);
        return
    }
    post = Object.assign(post, request.body)
    response.sendStatus(204);
});

