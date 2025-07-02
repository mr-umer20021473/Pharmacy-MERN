import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'; 
import connectDB from './config/db.js';



dotenv.config();

const port = 8000
connectDB()
const app = express()

app.use(cors());
app.use(express.json());




app.listen(port,()=> console.log(`Server Running on port ${port}`))