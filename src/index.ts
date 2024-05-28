const express = require("express");
require("dotenv").config();
const { DATABASE } = require("../src/database/dbConnect");
import { Request, Response, Application } from "express";
const productRouter = require("./router/productRouter");
const userRouter = require("./router/userRouter");
const productDetailRouter = require("./router/productDetailRouter");
const app = express();

const PORT = 8844;
// app.use(express.j)
app.use(express.json());
// app.get("/", (req: Request, res: Response) => { res.send("hello world") })
app.use(express.static("uploads"));
app.use(productRouter);
app.use(productDetailRouter);
app.use(userRouter);
// app.get('/', (req, res) => {
//     console.log("object==================")
//     const sql = 'SELECT * FROM product';
//     DATABASE.query(sql, (err, result) => {
//         if (err) {
//             throw err;
//         }
//         res.send(result);
//     });
// });

app.listen(PORT, () => {
  console.log(`App is running on localhost:${PORT}`);
});
