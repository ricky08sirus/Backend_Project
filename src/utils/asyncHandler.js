const asyncHandler = (requestHandler) =>{
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }

}

export {asyncHandler}
//we dont have to keep everything in tr and catch while writing controllers

// const asyncHandler = (fn) => async(req,res,next) =>{
//     //passing the function in the same fraction
//     try {
//         await fn(req,res,next)

        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             sucess:false,
//             message: err.message
//         })
        
//     }



// }