import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connect.js';

import dallesRouter from "./routes/dalles.js"
import postsRouter from "./routes/posts.js"


dotenv.config();

const app=express();
app.use(cors())
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/dalles',dallesRouter);
app.use('/api/v1/posts',postsRouter);

app.get('/',(req,res)=>{
    return res.status(200).send('Hello from dalle')
})




const startServer=async()=>{
    try{
    await connectDB(process.env.MONGO_URI);
    app.listen(8080,()=>{
        console.log('Server running at http://localhost:8080')
    })
    }catch(err) {
        console.log(err);
    }
}

startServer()

