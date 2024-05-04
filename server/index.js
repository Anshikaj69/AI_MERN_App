import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDb from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/posts' , postRoutes)


app.get('/', async (req, res) => {
    res.send("Hello from DALL-E");
})

const startServer = async () => {
    connectDb(process.env.CONNECTION_STRING)
    app.listen(5000, () => {
        console.log("port runnning on http://localhost:5000")
    })
}

startServer()

