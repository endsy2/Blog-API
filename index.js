import express, { json } from 'express';
import { config } from 'dotenv';
import authRouter from './Rounters/Authentication.js';
import userRouter from './Rounters/UserFunationality.js';
import pool from './Utils/db_connection.js';
import { validateToken } from './Utils/jwt_validate.js';
import cors from 'cors'
pool


config();

const app=express();
app.use(cors());
app.use(express.static('uploads'));
const port =process.env.port;

app.use(express.json());

pool.getConnection((error,conenction)=>{
    if(error)return console.log("false connecting db");
    console.log("connection successfully");
    conenction.release();
})

app.use('/user/auth',authRouter);
app.use('/user/functionality',userRouter);


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})