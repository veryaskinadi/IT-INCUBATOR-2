import {MongoClient} from "mongodb";

const url = "mongodb://localhost:27272"
export const client = new MongoClient(url)

export async function runDb() {
    try {
        await client.connect()
        await client.db("project").command({ ping: 1})
        console.log("Connected successfully to mongo server")
    } catch(err) {
        console.log("Can't connect to db", err)
        await client.close()
    }
}

type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export const blogs: Blog[] = [
    {id: '1', name: "katusha", description: "Песня о войне", websiteUrl: "https://musik-love"},
    {id: '2', name: "children", description: "Песня о детях", websiteUrl: "https://musik-love"}
]

type Post = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string
}
export const posts: Post[] = []
