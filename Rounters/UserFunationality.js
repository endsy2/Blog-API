import { Router } from "express";
import { blogPagination, createBlog, deleteBlog, getAllBlog, getSpecificBlog, updateBlog } from "../Controllers/UserHandleBlog.js";
import { getAllInfo,updateInfo,deleteAccount } from "../Controllers/UserHandleInformation.js";
import { validateToken } from "../Utils/jwt_validate.js";
import upload from "../Utils/handleImage.js";
import { getUserID } from "../Utils/GetUserID.js";
const userRouter=Router();

userRouter.use(validateToken);

userRouter.post("/createBlog",upload.single('file'),getUserID,createBlog)

userRouter.get("/getAllBlog",getUserID,getAllBlog);

userRouter.get("/getSpecificBlog",getUserID,getSpecificBlog);

userRouter.put("/updateBlog",upload.single('file'),getUserID,updateBlog);

userRouter.delete("/deleteBlog",getUserID,deleteBlog);

userRouter.get('/getAllInfo',getAllInfo);

userRouter.put('/updateInfo',upload.single('file'),updateInfo);

userRouter.delete('/deleteAccount',getUserID,deleteAccount);

userRouter.get('/blogPagination',getUserID,blogPagination);


export default userRouter;