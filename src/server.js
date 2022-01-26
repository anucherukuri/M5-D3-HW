import express from "express" 
import authorsRouter from "./services/authors/index.js"
const server = express()
const port = 3003

server.use(express.json())
server.use("/authors", authorsRouter)
server.listen(port, ()=>{
    console.log(`Server Running on port ${port}`)
})