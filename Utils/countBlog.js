export const countBlog=()=>{
    try{
        pool.query(count,useID,(error,result)=>{
            if(error){
                res.status(400).json({
                    message:"something went wrong"
                })
            }
            res.status(200).json({
                data:result,
                message:"successfully"
            })
        })
    }
}