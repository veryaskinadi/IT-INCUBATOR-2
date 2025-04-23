import {Blog} from "../models/BlogModel"
import {client, ObjectId} from "../db"
import {CreateBlogModel} from "../models/CreateBlogModel"
import {UpdateBlogModel} from "../models/UpdateBlogModel"

const database = client.db('project'); // Имя базы данных
const collection = database.collection('blogs'); // Коллекция блогов


export const getAllBlogs = async (): Promise<Blog[]> => {
    const blogs = await collection.find({}).toArray()
    return blogs.map((blog:any) => ({
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
    }));
}

export const createNewBlog = async (data: CreateBlogModel) : Promise<Blog> => {
    const blog = await collection.insertOne(data)
    return {
        ...data,
        id: blog.insertedId.toString()
    }
}

export const getBlogId = async (blogId: string) : Promise<Blog | null> => {
    const objectId = new ObjectId(blogId)   // Преобразование строки userId в правильный ObjectId
    const blog = await collection.findOne({ _id: objectId })
    if (!blog) {
        return null
    } else {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
        }
    }
}

export const deleteBlog = async (blogId: string): Promise<void> => {
    const objectId = new ObjectId(blogId)
    collection.deleteOne( {_id: objectId})
}

export const updateBlog = async (blogId: string, data: UpdateBlogModel): Promise<void> => {
    const objectId = new ObjectId(blogId)
    collection.updateOne({_id: objectId},{ $set: data})
}