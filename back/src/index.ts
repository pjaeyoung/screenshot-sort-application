import express from "express";

const app: express.Application = express();
const bodyParser = require('body-parser');

app.get(
    "/",
    (req: express.Request, res: express.Response, next: express.NextFunction)=>{
        res.send("hello world!");
    }
)

export defat app;