const express=require("express")
const dotenv=require("dotenv")
const router=require("./routes/router")
const app=express()

app.set("view engine","ejs")
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`)
})