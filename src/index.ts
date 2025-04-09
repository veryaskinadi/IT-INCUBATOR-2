import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {blogsRouter} from "./presentation/routes/blogs-router";
import {postsRouter} from "./presentation/routes/posts-router";
import {settings} from "./presentation/application/settings";
import {testingRouter} from "./presentation/routes/testing-router";
import {authMiddleware} from "./presentation/midlewares/auth-middleware";

const app = express()
app.use(express.json())
const port = settings.PORT;

app.get('/', (req: Request, res: Response) => {
    let helloMessage = "hello"
    res.send(helloMessage)
})

app.use('/blogs', authMiddleware, blogsRouter);
app.use('/testing', authMiddleware, testingRouter);
app.use('/posts', postsRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})