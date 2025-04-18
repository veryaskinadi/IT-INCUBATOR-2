import {Blog} from "../models/blogModel";
import {client} from "../db"


export const getAllBlogs = async (): Promise<Blog[]> => {
    const blogs = await client.db("project").collection("blogs").find({}).toArray()
    return blogs.map((blog:any) => ({
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl
    }));
}