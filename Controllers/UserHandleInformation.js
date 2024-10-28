import pool from "../Utils/db_connection.js";
import bcrypt from 'bcrypt';
import generateToken from "../Utils/generateToken.js";

export const updateInfo=async(req,res)=>{
    const username=req.user;
    const profile=req.file;
    const {newUserName,email,password}=req.body;

    const query='UPDATE user SET username=?,email=?,password=?,profile=? WHERE username=?';

    try {

        const hashedPassword=await bcrypt.hash(password,10);
        console.log(hashedPassword);
        
        const value=[newUserName,email,hashedPassword,profile.filename,username];

        pool.query(query,value,(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"Something went wrong"
                })
            }
            const token=generateToken({username:newUserName})
            res.status(200).json({
                message:'Successfully',
                data:result,
                token:token,
            });
        });
    } catch (error) {
        res.status(400).json({
            message:'something went wrong'
        })
        
    }
}
export const deleteAccount=(req,res)=>{

    const username=req.user;
    const userid=req.userID;
    console.log(userid);
    
    console.log(username);
    
    const queryDeleteBlog='DELETE FROM blog WHERE userID=? '

    const query='DELETE FROM user WHERE username=?';

    try{
        pool.query(queryDeleteBlog,userid,(error,result)=>{
            if(error){
                res.status(400).json({
                    messenge:"something went wrong"
                })
            }
            res.status(200).json({
                message:"Successfully",
                data:result
            })
        })
        pool.query(query,username,(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"something went wrong"
                })
            }
            res.status(200).json({
                message:"Delete Successfully",
                data:result 
            })
        })
    }
    catch(error){
        res.statue(400).json({
            message:"something went wrong"
        })
    }
}

export const getAllInfo=(req,res)=>{
    const username=req.user;
    
    

    const query='SELECT * FROM user WHERE username=?'

    try{
        pool.query(query,username,(error,result)=>{
            if(error){
                res.status(400).json({
                    message:'Something went wrong'
                })
            }
            res.status(200).json({
                message:'This is your information',
                data:result
            })
        })
    }
    catch(error){
        res.status(400).json({
            message:'Something went wrong' 
        })
    }
}