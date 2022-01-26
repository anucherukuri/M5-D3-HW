import express from "express" 
import authorsRouter from "./services/authors/index.js"
import blogPostsRouter from "./services/blogPosts/index.js"

import {badRequestHandler,unauthorizedHandler,notFoundHandler,genericErrorHandler} from "./errorHandlers.js"
const server = express()
const port = 3003

server.use(express.json())
server.use("/authors", authorsRouter)
server.use("/blogPost", blogPostsRouter)

  // eroro middle wares
server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

server.listen(port, ()=>{
    console.log(`Server Running on port ${port}`)
})