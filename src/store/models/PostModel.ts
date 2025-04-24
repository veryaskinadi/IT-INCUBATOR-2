export type Post = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    createdAt: string;
}

export type PostWithBlog = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    createdAt: string;
    blogName: string;
}