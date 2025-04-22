import {CreatePostModel} from "../models/CreatePostModel"
import {Post} from "../models/PostModel"
import * as blogsService from "../blogs/blogsService"
import * as postRepository from "../../store/repositories/posts-repository"


export const createPost = async (data: CreatePostModel): Promise<Post> => {
    const blog = await blogsService.getBlogId(data.blogId)
    if (!blog) {
        throw new Error("blog not found")
    }
    const postForMongo = {
        ...data,
        createdAt: new Date().toISOString(),
    }

    const post = await postRepository.createPost(postForMongo)

    return {
        ...post,
        blogName: blog.name,
    }
}