import {Request, Response, Router} from "express";
import {blogs} from "../../store/db"
import {authMiddleware} from "../midlewares/auth-middleware";

export const testingRouter = Router({})

// testingRouter.delete, authMiddleware, ('/all-data', (request: Request, response: Response) => {
//     blogs.splice(0,blogs.length)
//     response.sendStatus(204)
// })