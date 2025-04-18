import express, {Request, Response} from 'express'
import bodyParser from "body-parser";
import {blogsRouter} from "./presentation/routes/blogs-router";
import {postsRouter} from "./presentation/routes/posts-router";
import {settings} from "./presentation/application/settings";
import {testingRouter} from "./presentation/routes/testing-router";
import {authMiddleware} from "./presentation/midlewares/auth-middleware";
import {runDb} from "./store/db";

const app = express()
//app.use(express.json())
app.use(bodyParser.json({strict: false}));
const port = settings.PORT;

app.get('/', (req: Request, res: Response) => {
    let helloMessage = "zaeb"
    res.send(helloMessage)
})

app.use('/blogs', authMiddleware, blogsRouter);
app.use('/testing', authMiddleware, testingRouter);
app.use('/posts', postsRouter);

const startApp = async () => {
    await runDb();
    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
}

startApp()