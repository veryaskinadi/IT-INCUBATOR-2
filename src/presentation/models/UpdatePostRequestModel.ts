import {Request} from "express";

export type UpdatePostRequestModel = Request<{id: string;}, {}, {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
}>