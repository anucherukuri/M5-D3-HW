import express from "express" // 3RD PARTY MODULE (npm i express)
import fs from "fs" // CORE MODULE (no need to install it)
import { fileURLToPath } from "url" // CORE MODULE
import { dirname, join } from "path" // CORE MODULE
import uniqid from "uniqid"


const authorsRouter = express.Router() 
// all the endpoints in the router will have the url http://localhost:3001/authors as PREFIX

const currentFilePath = fileURLToPath(import.meta.url)


const parentFolderPath = dirname(currentFilePath)


const authorsJSONPath = join(parentFolderPath, "authors.json") 


//POST AUTHORS
authorsRouter.post("/", (req, res) => {
  
//Read the request body obtaining new author's data
  console.log("REQUEST BODY: ", req.body) 

 //Add some server generated informations to the new author (id, creationDate, ....)
  const newAuthor = { ...req.body, createdAt: new Date(), ID: uniqid() }
  console.log(newAuthor)

  //Read authors.json --> obtaining an array
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  //Add new author to the array
  authorsArray.push(newAuthor)

  //Write the array back to the file authors.json
  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

  //Send a proper response back

  res.status(201).send({ id: newAuthor.id })
})

authorsRouter.get("/",(req,res) => {

const fileContent = fs.readFileSync(authorsJSONPath) // You obtain a BUFFER object, which is MACHINE READABLE ONLY
  console.log("FILE CONTENT: ", JSON.parse(fileContent))

  // Get back an array from the file
  const authorsArray = JSON.parse(fileContent) // JSON.parse converts BUFFER into a real ARRAY

  //Send back the array as a response
  res.send(authorsArray)

})

//Read Specific Author
authorsRouter.get("/:id",(req,res) => {

const fileContent = fs.readFileSync(authorsJSONPath) // You obtain a BUFFER object, which is MACHINE READABLE ONLY
  console.log("FILE CONTENT: ", JSON.parse(fileContent))
    console.log(req.params.id)
  //Get back an array from the file
  const authorsArray = JSON.parse(fileContent) // JSON.parse converts BUFFER into a real ARRAY
  const specificAuthor = authorsArray.find(author => author.ID == req.params.id)
  //Send back the array as a response
  res.send(specificAuthor)

})

//PUT 

authorsRouter.put("/:id", (req, res) => {
const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

const index= authorsArray.findIndex(author => author.ID == req.params.id)
const oldAuthor = authorsArray[index]
const updatedAuthor = {...oldAuthor, ...req.body, updatedAt: new Date()}
authorsArray[index] = updatedAuthor

fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray))

res.send(updatedAuthor)

})

//DELETED 

authorsRouter.delete("/:id", (req, res) => {
  // 1. Read the file --> obtaining an array of users
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))

  // 2. Filter out the specified user from the array, keeping just the remaining ones
  const remainingAuthors = authorsArray.filter(user => user.ID !== req.params.id) // ! = =

  // 3. Save the remaining users back on the file users.json
  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors))

  // 4. Send back a proper response
  res.status(204).send()
})

//COMPARE EMAILS

authorsRouter.post("/:email", (req, res) => {
 
     console.log("REQUEST BODY: ", req.body)

  // 2. Add some server generated informations to the new author (id, creationDate, ....)
  const newAuthor = { ...req.body, createdAt: new Date(), ID: uniqid() }
  console.log(newAuthor)

  // 3. Read authors.json --> obtaining an array
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath))
  

})

export default authorsRouter


