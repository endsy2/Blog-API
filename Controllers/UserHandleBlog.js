import pool from "../Utils/db_connection.js";



export const createBlog=(req,res)=>{
    const userID=req.userID;
    console.log(userID);
    
    const {title,category,description}=req.body;
    const banner_image=req.file;
    const value=[userID,title,category,description,banner_image.filename];
    const insertQuery=`INSERT INTO blog (userID,title,category,description,banner_image) VALUES(?,?,?,?,?)`
    if(!title || !category || !description || !banner_image){
        res.status(400).json({
            message:"Everything Must fill"
        })
    }
    try {
        pool.query(insertQuery,value,(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"query went wrong"
                })
            }
            res.status(200).json({
                message:"Successfully",
                data:result
            }) 
        })
    } catch (error) { 
        res.status(400).json({
            message:"something went wrong"
        })
    }
}

export const updateBlog=(req,res)=>{
    const userID=req.userID;
    const banner_image=req.file.filename;
    const {id,newTitle,category,description}=req.body;

    const query="UPDATE blog SET title=?,category=?,description=?,banner_image=? WHERE userID=? AND id=?";

    const value=[newTitle,category,description,banner_image,userID,id];
    try {
        pool.query(query,value,(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"query went wrong"
                })
            }
            res.status(200).json({
                message:"Successfully",
                data:result
            })
        })
    } catch (error) {
        res.status(400).json({
            message:'something went wrong'
        })
    }
}

export const deleteBlog=(req,res)=>{
    const userID =req.userID;   
    const {blogID}=req.body;

    
    const query ="DELETE FROM blog WHERE userID=? AND id=?";
    try {
        pool.query(query,[userID,blogID],(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"something went wrong"
                })
            }
            res.status(200).json({
                message:"Successfully",
                data:result
            })
        })
    } catch (error) {
        res.status(400).json({
            message:"something went wrong"
        })
    }
}

export const getAllBlog=(req,res)=>{
    const userID=req.userID;

    const query ="SELECT * FROM blog WHERE userID=?";

    try {
        pool.query(query,userID,(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"query went wrong"
                })
            }
            res.status(200).json({
                message:"Successfully",
                data:result
            })
        })
    } catch (error) {
        res.status(400).json({
            message:"Something went wrong"
        })
    }
    
}

export const getSpecificBlog=(req,res)=>{
    const userID =req.userID;
    console.log("ID:"+userID);
    
    const {id}=req.query;
    console.log("blog ID:"+id);
    
    const searchquery="SELECT * FROM blog WHERE userID=? AND id=?";

    try {
        pool.query(searchquery,[userID,id],(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"Query went wrong"
                })
            }
            res.status(200).json({
                message:"Successfully",
                data:result
            })
            console.log(result);
        })
        
        
    } catch (error) {
        res.status(400).json({
            message:"something went wrong"
        })
    }
}
export const blogPagination = (req, res) => {
    const useID = req.userID;
    const limit = 4;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
  
    const sql = "SELECT * FROM blog WHERE userID = ? LIMIT ? OFFSET ?";
    const countSql = "SELECT COUNT(id) AS totalBlogs FROM blog WHERE userID = ?";
    const queryValues = [useID, limit, offset];
  
    try {
      // Count query to get total number of blogs
      pool.query(countSql, [useID], (error, countResult) => {
        if (error) {
          return res.status(500).json({ message: "Error counting blogs" });
        }
  
        const totalBlogs = countResult[0].totalBlogs;
        const totalPages = Math.ceil(totalBlogs / limit);
  
        // Pagination query to get the blog data
        pool.query(sql, queryValues, (error, result) => {
          if (error) {
            return res.status(400).json({ message: "Query went wrong" });
          }
          res.status(200).json({
            message: "Successfully fetched blogs",
            data: result,
            currentPage: page,
            totalPages: totalPages,
            totalBlogs: totalBlogs,
          });
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  