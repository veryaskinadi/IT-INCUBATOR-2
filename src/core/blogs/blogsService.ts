import * as blogsRepository from "../../store/repositories/blogs-repository";
import {Blog} from "../models/blogModel";


export const getAllBlogs = async (): Promise<Blog[]> => {
    const blogs = await blogsRepository.getAllBlogs()
    /*const allBlogs = blogs.items.map(blog => ({
            ...blog,
            isMembership: false,
        })
    )*/
    return blogs
    }