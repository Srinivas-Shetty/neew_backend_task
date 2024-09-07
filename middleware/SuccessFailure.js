module.exports={
    successMessage: (res,port,msg,data)=>{
        return res.status(port).json({
            status:port,
            success:"success",
            msg:msg,
            data:data || []
        })
    },
    ErrorMessage: (res,port,msg,data)=>{
        return res.status(port).json({
            status:port,
            success:"failure",
            msg:msg,
            data:data || []
        })
    }
}