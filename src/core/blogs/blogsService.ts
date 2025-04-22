import * as blogsRepository from "../../store/repositories/blogs-repository";
import {Blog} from "../models/BlogModel";
import {CreateBlogModel} from "../models/CreateBlogModel";


export const getAllBlogs = async (): Promise<Blog[]> => {
    const blogs = await blogsRepository.getAllBlogs()
    const allBlogs = blogs.map(blog => ({
            ...blog,
            isMembership: false,
        })
    )
    return allBlogs
}

export const createNewBlog = async (data: CreateBlogModel): Promise<Blog> => {

    const blog = {
        ...data,
        createdAt: new Date().toISOString(),
    }
    const newBlog = await blogsRepository.createNewBlog(blog)

    return {
        ...newBlog,
        isMembership: false,
    }
}

export const getBlogId = async (blogId: string): Promise<Blog | null> => {
    const blog = await blogsRepository.getBlogId(blogId)
    if(!blog) {
        return null
    }
    return  {
        ...blog,
        isMembership: false,
    }
}

export const deleteBlog = async (blogId: string): Promise<void> => {
    await blogsRepository.deleteBlog(blogId)
}
