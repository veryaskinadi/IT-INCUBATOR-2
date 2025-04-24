import {CreatePostModel} from "../models/CreatePostModel"
import {Post, PostWithBlog} from "../models/PostModel"
import * as blogsService from "../blogs/blogsService"
import * as postsRepository from "../../store/repositories/posts-repository"


export const createPost = async (data: CreatePostModel): Promise<Post> => {
    const blog = await blogsService.getBlogId(data.blogId)
    if (!blog) {
        throw new Error("blog not found")
    }
    const postForMongo = {
        ...data,
        createdAt: new Date().toISOString(),
    }

    const post = await postsRepository.createPost(postForMongo)

    return {
        ...post,
        blogName: blog.name,
    }
}

export const getAllPosts = async (): Promise<PostWithBlog[]> => {
    const posts = await postsRepository.getAllPost()
    console.log (posts)
    return posts
}