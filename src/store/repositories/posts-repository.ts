import {client, ObjectId} from "../db"
import {CreatePostModel} from "../models/CreatePostModel";
import {Post, PostWithBlog} from "../models/PostModel";


const database = client.db('project'); // Имя базы данных
const collection = database.collection('posts'); // Коллекция постов

export const createPost = async (data: CreatePostModel): Promise<Post> => {
    const post = await collection.insertOne({
        ...data,
        blogId: new ObjectId(data.blogId)
    })
    return {
        ...data,
        id: post.insertedId.toString()
    }
}

export const getAllPost = async (): Promise<PostWithBlog[]> => {
    const posts = await  collection.aggregate([
        {
            $lookup: {
                from: "blogs",           // Названия другой коллекции (из которой берём данные)
                localField: "blogId",    // Поле текущего документа, по которому объединять
                foreignField: "_id",     // Поле другой коллекции, соответствующее нашему `localField`
                as: "blogInfo"           // Ключ, под которым будут помещаться присоединённые данные
            }
        },
        {
            $unwind: "$blogInfo"         // Распаковываем массив "blogInfo", превращая его в отдельные объекты
        },
        {
            $addFields: {               // Динамическое добавление нужного поля ("name") в каждый пост
                "blogName": "$blogInfo.name"
            }
        },
        {
            $project: {                 // Проецирование финального результата, скрываем лишнюю информацию
                blogInfo: 0              // Удаляет ненужное поле "blogInfo"
            }
        }
    ]).toArray()

    const allPosts = posts.map(post => ({
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        createdAt: post.createdAt,
        blogName: post.blogName,
        blogId: post.blogId.toString(),
    }))
    console.log(allPosts)
    return allPosts
}