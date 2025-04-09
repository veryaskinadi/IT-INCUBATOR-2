import {Request} from "express";

export type CreatePostForClientModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}