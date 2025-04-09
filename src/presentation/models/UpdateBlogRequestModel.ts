import {Request} from "express";

export type UpdateBlogRequestModel = Request<{id: string;}, {}, {
    name: string;
    description: string;
    websiteUrl: string;
}>