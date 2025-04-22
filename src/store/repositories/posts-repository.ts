import {client, ObjectId} from "../db"
import {CreatePostModel} from "../models/CreatePostModel";
import {Post} from "../models/PostModel";


const database = client.db('project'); // Имя базы данных
const collection = database.collection('blogs'); // Коллекция блогов

export const createPost = async (data: CreatePostModel): Promise<Post> => {
    const post = await collection.insertOne(data)
    return {
        ...data,
        id: post.insertedId.toString()
    }
}