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