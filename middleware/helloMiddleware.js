const helloMiddleware = (req,res,next)=>{
    console.log("hello")
    next()
}

module.exports = helloMiddleware;