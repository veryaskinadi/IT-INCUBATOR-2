import {Request, Response, Router} from "express";
import {blogs} from "../../store/db"

export const testingRouter = Router({})

testingRouter.delete('/all-data', (request: Request, response: Response) => {
    blogs.splice(0,blogs.length);
    response.sendStatus(204);
})