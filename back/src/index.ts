import express, { application } from "express";

const app: express.Application = express();

app.get(
    "/",
    (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        res.send("hello world!");
    }
)

export default app;